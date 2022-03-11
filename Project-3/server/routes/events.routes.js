const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
var ObjectId = require("mongoose").Types.ObjectId;
const Event = require("../models/Event.model");
const User = require("../models/User.model")

//---------------------------------------------------------------------------
//--------------------------DISPLAY ALL EVENTS-------------------------------
//---------------------------------------------------------------------------

router.get("/", (req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------CREATE A NEW EVENT-------------------------------
//---------------------------------------------------------------------------

router.post("/:id", (req, res) => {

const {title, description, image, date, schedule, price, tags} = req.body;
let titleToLowerCase = title.toLowerCase();

  Event.create({
    title: titleToLowerCase, 
    description, 
    image, 
    date, 
    schedule, 
    price, 
    tags
  })
    .then((newEvent) => {
      res.json(newEvent)})
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------GET SPECIFIED EVENT------------------------------
//---------------------------------------------------------------------------

router.get("/:eventId", (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findById(eventId).then((event) => res.status(200).json(event));
});

//---------------------------------------------------------------------------
//--------------------------EDIT SPECIFIED EVENT------------------------------
//---------------------------------------------------------------------------

router.put("/:eventId", (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  const {title, description, image, date, schedule, price, tags} = req.body
  let titleToLowerCase = title.toLowerCase();


  Event.findByIdAndUpdate(eventId, { title: titleToLowerCase, description, image, date, schedule, price, tags }, { new: true })

    .then((updatedEvent) => res.status(200).json(updatedEvent))
    .catch((error) => res.json(error));
});

//---------------------------------------------------------------------------
//--------------------------DELETE SPECIFIED EVENT----------------------------
//---------------------------------------------------------------------------

router.delete("/:eventId", (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndDelete(eventId)
    .then((deletedEvent) => res.status(400).json(deletedEvent))
    .catch((error) => res.json(error));
});

module.exports = router;
