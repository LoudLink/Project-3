const router = require("express").Router();
const announcementsRoutes = require("./announcements.routes");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const Announcement = require("../models/Announcement.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

//---------------------------------------------------------------------------
//--------------------------GET ALL ANNOUNCEMENTS---------------------------
//---------------------------------------------------------------------------

router.get("/", (req, res) => {
  Announcement.find()
  .populate("owner")
    .then((announcement) => res.json(announcement))
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------CREATE A NEW ANNOUNCEMENT--------------------
//---------------------------------------------------------------------------

router.post("/:id", (req, res) => {
  const { title, description, announcementDate, expirationDate, tags, location, image } =
    req.body;
  let titleToLowerCase = title.toLowerCase();

  Announcement.create({
    owner: req.params.id,
    title: titleToLowerCase,
    image,
    description,
    announcementDate, 
    expirationDate,
    tags,
    location,
    
  })
    .then((newEvent) => {
      console.log("announcementId", newEvent._id.toString());
      console.log("userId", req.params);

      return User.findByIdAndUpdate(
        req.params.id,
        { $push: { ownAnnouncements: newEvent._id.toString() } },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------GET SPECIFIED ANNOUNCEMENT-----------------------
//---------------------------------------------------------------------------

router.get("/:announcementId", (req, res) => {

  const { announcementId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(announcementId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Announcement.findById(announcementId)
  .populate("participants")
  .populate("accepted")
  .then((announcement) =>{
    //console.log("HERE COMES THE POP",announcement.participants[0])
    res.status(200).json(announcement)}
  );
});

//---------------------------------------------------------------------------
//--------------------------EDIT SPECIFIED ANNOUNCEMENT----------------------
//---------------------------------------------------------------------------

router.put("/:announcementId/edit", (req, res) => {
  const { announcementId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(announcementId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const { title, description, announcementDate, expirationDate, tags, location, image } = req.body;
  let titleToLowerCase = title.toLowerCase();

  Announcement.findByIdAndUpdate(
    announcementId,
    { title: titleToLowerCase, description, announcementDate, expirationDate, tags, image, location },
    { new: true }
  )
    .then((updatedAnnouncement) => res.status(200).json(updatedAnnouncement))
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------UPLOAD IMAGE FOR ANNOUNCEMENT----------------------------
//---------------------------------------------------------------------------


router.post("/:id/img-upload", fileUploader.single("image"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  res.json({ fileUrl: req.file.path });
});


//---------------------------------------------------------------------------
//--------------------------DELETE SPECIFIED ANNOUNCEMENT--------------------
//---------------------------------------------------------------------------

router.delete("/:announcementId/edit", (req, res) => {
  const {announcementId}  = req.params;
  console.log("trying to delete", announcementId)

  if (!mongoose.Types.ObjectId.isValid(announcementId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Announcement.findByIdAndDelete(announcementId)
    .then((deletedAnnouncement) => res.status(400).json(deletedAnnouncement), {new:true})
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------PUSHING ARTISTS/ANNOUNCEMENTS ARRAYS-------------
//---------------------------------------------------------------------------

router.post("/:id/apply/:an", (req, res) => {
  const { id, an } = req.params;
  let flag = false;

  User.findById(id)
  .then((user) => {
    if (user.announcements.length === 0) {
      User.findByIdAndUpdate(id, { $push: { announcements: an }})
      .then((__)=>
        Announcement.findByIdAndUpdate(an, {
          $push: { participants: id }}, {new: true}
        )
        .populate("participants")
        .populate("accepted")
        .then((response)=>res.json(response))
      );




    } else {
      user.announcements.map((ano) => {
        if (ano.toString() === an) flag = true;
      });

      if (flag === false) {
        User.findByIdAndUpdate(id, { $push: { announcements: an } })

        .then(()=>
          Announcement.findByIdAndUpdate(an, {$push: { participants: id }}, {new:true})
            .populate("participants")
            .populate("accepted")
            .then((response)=>res.json(response))
        );
      } else {
        console.log("you've alredy applied");
      }
    }
  });
});

//---------------------------------------------------------------------------
//--------------------------ACCEPTING PARTICIPANTS---------------------------
//---------------------------------------------------------------------------

router.put("/:an/confirm/:art", (req, res) =>{
  let announcement = req.params.an
  let artist = req.params.art


  /*
  Announcement.findByIdAndUpdate(announcement, {$pullAll: {participants : [artist]}})
  .then(
    Announcement.findByIdAndUpdate(announcement, {$push: {accepted: [artist]}}, {new :true})
    .then(  User.findByIdAndUpdate(artist, {$pullAll: {announcements : [announcement]}}, {new : true})
      //.populate("accepted participants")
      .then(
        User.findByIdAndUpdate(artist, {$push: {acceptedAnnouncements: [announcement]}}, {new:true})
        .then((response)=>{res.json(response)})
    )
  
    
    )
  )
*/
  User.findByIdAndUpdate(artist, {$pullAll: {announcements : [announcement]}}, {new : true})
      .populate("acceptedAnnouncements")
      .then(()=>
        User.findByIdAndUpdate(artist, {$push: {acceptedAnnouncements: announcement}}, {new:true})
        .populate("acceptedAnnouncements")


        .then(()=>Announcement.findByIdAndUpdate(announcement, {$pullAll: {participants : [artist]}} , {new:true})
          .then(()=>
            Announcement.findByIdAndUpdate(announcement, {$push: {accepted: [artist]}}, {new :true})
            .populate("participants")
            .populate("accepted")
            .then((response)=>res.json(response))
          )))
  



})

//---------------------------------------------------------------------------
//--------------------------REMOVE ARTISTS-----------------------------------
//---------------------------------------------------------------------------

router.delete("/:an/delete/:art", (req, res)=>{
  let announcement = req.params.an
  let artist = req.params.art
  console.log("ANNOUNCEMENT", announcement)
  console.log("ARTIST", artist)

  User.findByIdAndUpdate(artist, {$pullAll: {acceptedAnnouncements : [announcement]}}, {new : true})
  .then(()=>
  Announcement.findByIdAndUpdate(announcement, {$pullAll: {accepted: [artist]}}, {new :true})
    .populate("participants")
    .populate("accepted")
    .then(()=>{
      (response)=>res.json(response)
    })
  )

})

module.exports = router;
