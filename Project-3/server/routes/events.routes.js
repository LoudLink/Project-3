const router = require("express").Router();

const mongoose = require("mongoose")

var ObjectId = require('mongoose').Types.ObjectId;



const Event = require("../models/Event.model")

/* ------------- GET ALL EVENTS ------------------------ */

router.get("/events", (req, res) => {
  Event.find()
  .then((events)=>res.json(events))
  .catch(error=>res.json(error))
});


/* ------------- CREATE A NEW EVENT ------------------------ */


router.post("/events", (req, res)=>{
    
    Event.create(req.body)
    .then((newEvent)=> res.json(newEvent))
    .catch(error=>res.json(error))
})

/* ------------- GET A SPECIFIC EVENT ------------------------ */


router.get("/events/:eventId", (req, res)=>{

    const {eventId} = req.params

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    Event.findById(eventId)
    .then((event)=> res.status(200).json(event))
})

/* ------------- EDIT A SPECIFIC EVENT ------------------------ */

router.put("/events/:eventId", (req, res)=>{

    const {eventId} = req.params

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    Event.findByIdAndUpdate(eventId, req.body, {new: true})
    .then(updatedEvent => res.status(200).json(updatedEvent))
    .catch((error) => res.json(error));

})

/*--------------------DELETE A SPECIFIC EVENT ------------------*/

router.delete("/events/:eventId", (req, res)=>{

    const {eventId} = req.params

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }


    Event.findByIdAndDelete(eventId)
    .then((deletedEvent)=> res.status(400).json(deletedEvent))
    .catch((error) => res.json(error))
  })




module.exports = router;