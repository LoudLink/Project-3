const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Announcement = require("../models/Announcement.model");
const Event = require("../models/Event.model");
const fileUploader = require("../config/cloudinary.config");


//---------------------------------------------------------------------------
//--------------------------DISPLAY ALL USERS--------------------------------
//---------------------------------------------------------------------------

router.get("/", (req, res) => {
  User.find()
    .populate("ownEvents")
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json(err));
});

//---------------------------------------------------------------------------
//--------------------------RETURN SPECIFIED USER----------------------------
//---------------------------------------------------------------------------

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const userannouncement = []

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)

    .populate("ownAnnouncements")
    .populate('ownEvents')

    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
});

//---------------------------------------------------------------------------
//--------------------------EDIT SPECIFIED USER------------------------------
//---------------------------------------------------------------------------


router.put("/:userId", (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

    const { username, description, tags, location, videos, image } = req.body

    let usernameToLowerCase = username.toLowerCase();

    console.log(req.file)





  User.findByIdAndUpdate(userId, { username: usernameToLowerCase, image, description, tags, location, $push:{videos:[videos]}}, { new: true })
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((error) => res.json(error));
});
//---------------------------------------------------------------------------
//--------------------------UPLOAD IMAGE FOR USER----------------------------
//---------------------------------------------------------------------------




router.post("/:id/img-upload", fileUploader.single("image"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

//---------------------------------------------------------------------------
//--------------------------DELETE SPECIFIED USER----------------------------
//---------------------------------------------------------------------------

router.delete("/:userId", (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
  .then((user) => 
  Event.deleteMany({_id: {$in: user.ownEvents}})
  .then((_) => 
  Announcement.deleteMany({_id: {$in: user.ownAnnouncements}}))
  .then((_) => 
  User.findByIdAndDelete(userId)
  .then((deletedUser)=> {
    res.json(deletedUser)
  })
  .catch(err=>console.log(err))
  )
  )
 
})

///////////DELETE VIDEO/////////////

router.delete('/:userId/deletevideo/:videoId', (req, res)=>{

  let userId = req.params.userId
  let videoId = req.params.videoId
  User.findByIdAndUpdate(userId, {$pullAll: {videos: [videoId]}}, {new : true})
  .then((response) => {res.json(response)})

  
})

module.exports = router;
