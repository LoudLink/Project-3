const router = require("express").Router();
const announcementsRoutes = require("./announcements.routes");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const Announcement = require("../models/Announcement.model");
const User = require("../models/User.model");

//---------------------------------------------------------------------------
//--------------------------GET ALL ANNOUNCEMENTS---------------------------
//---------------------------------------------------------------------------

router.get("/", (req, res) => {
  Announcement.find()
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
    location
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

  Announcement.findById(announcementId).then((announcement) =>
    res.status(200).json(announcement)
  );
});

//---------------------------------------------------------------------------
//--------------------------EDIT SPECIFIED ANNOUNCEMENT----------------------
//---------------------------------------------------------------------------

router.put("/:announcementId", (req, res) => {
  const { announcementId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(announcementId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const { title, description, eventDate, expirationDate, tags } = req.body;
  let titleToLowerCase = title.toLowerCase();

  Announcement.findByIdAndUpdate(
    announcementId,
    { title: titleToLowerCase, description, eventDate, expirationDate, tags },
    { new: true }
  )
    .then((updatedAnnouncement) => res.status(200).json(updatedAnnouncement))
    .catch((error) => res.json(error));
});



//---------------------------------------------------------------------------
//--------------------------DELETE SPECIFIED ANNOUNCEMENT--------------------
//---------------------------------------------------------------------------

router.delete("/:announcementId", (req, res) => {
  const { announId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(announId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Announcement.findByIdAndDelete(announId)
    .then((deletedAnnouncement) => res.status(400).json(deletedAnnouncement))
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------PUSHING ARTISTS/ANNOUNCEMENTS ARRAYS-------------
//---------------------------------------------------------------------------

router.post("/:id/apply/:an", (req, res) => {
  const { id, an } = req.params;
  let flag = false;

  User.findById(id).then((user) => {
    if (user.announcements.length === 0) {
      User.findByIdAndUpdate(id, { $push: { announcements: an } }).then(
        res.status(200).json({ message: "applied successfully" })
      );
    } else {
      user.announcements.map((ano) => {
        if (ano.toString() === an) flag = true;
      });

      if (flag === false) {
        User.findByIdAndUpdate(id, { $push: { announcements: an } }).then(
          res.status(200).json({ message: "applied successfully" })
        );

        Announcement.findByIdAndUpdate(an, {
          $push: { participants: id },
        }).then(console.log("SOMETHING"));
      } else {
        console.log("you've alredy applied");
      }
    }
  });
});

module.exports = router;
