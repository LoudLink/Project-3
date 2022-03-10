const router = require("express").Router();
const announcementsRoutes = require("./announcements.routes");

const mongoose = require("mongoose")

var ObjectId = require('mongoose').Types.ObjectId;


const Announcement = require("../models/Announcement.model");

/* ------------- GET ALL ANNOUNCEMENTS ------------------------ */

router.get("/announcements", (req, res) => {
  Announcement.find()
    .then((announcement) => res.json(announcement))
    .catch((error) => res.json(error));
});

/* ------------- CREATE A NEW ANNOUNCEMENT ------------------------ */

router.post("/announcements", (req, res) => {
  Announcement.create(req.body)
    .then((newAnnoun) => res.json(newAnnoun))
    .catch((error) => res.json(error));
});

/* ------------- GET A SPECIFIC ANNOUNCEMENT ------------------------ */

router.get("/announcements/:announcementsId", (req, res) => {
  const { announcementsId } = req.params;

  console.log(announcementsId)

  if (!mongoose.Types.ObjectId.isValid(announcementsId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Announcement.findById(announcementsId).then((announcement) => res.status(200).json(announcement));
});

/* ------------- EDIT A SPECIFIC ANNOUNCEMENT ------------------------ */

router.put("/announcements/:announcementsId", (req, res) => {
  const { announId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(announId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Announcement.findByIdAndUpdate(announId, req.body, { new: true })
    .then((updatedAnnouncement) => res.status(200).json(updatedAnnouncement))
    .catch((error) => res.json(error));
});

/*--------------------DELETE A SPECIFIC ANNOUNCEMENT ------------------*/

router.delete("/announcements/:announcementsId", (req, res) => {
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
