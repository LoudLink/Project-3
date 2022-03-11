const router = require("express").Router();
const announcementsRoutes = require("./announcements.routes");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const Announcement = require("../models/Announcement.model");

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

router.post("/", (req, res) => {
const {title, description, eventDate, expirationDate, tags} = req.body;
let titleToLowerCase = title.toLowerCase();

  Announcement.create({
    title: titleToLowerCase, 
    description, 
    eventDate,
    expirationDate,
    tags
  })

    .then((newAnnoun) => res.json(newAnnoun))
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

  const {title, description, eventDate, expirationDate, tags} = req.body;
  let titleToLowerCase = title.toLowerCase();
  
  Announcement.findByIdAndUpdate(announcementId, { title: titleToLowerCase, description, eventDate, expirationDate, tags }, { new: true })
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

module.exports = router;
