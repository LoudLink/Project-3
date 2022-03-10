const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('../models/User.model');

//---------------------------------------------------------------------------
//--------------------------DISPLAY ALL USERS--------------------------------
//---------------------------------------------------------------------------

router.get('/', (req, res) => {
    User.find()
    .then((allUsers) =>res.json(allUsers))
    .catch((err) => res.json(err))
})


//---------------------------------------------------------------------------
//--------------------------RETURN SPECIFIED USER----------------------------
//---------------------------------------------------------------------------

router.get('/api/users/:userId', (req,res) =>{
    const {userId} = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    User.findById(userId)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.json(err))
})

//---------------------------------------------------------------------------
//--------------------------EDIT SPECIFIED USER------------------------------
//---------------------------------------------------------------------------

router.put('/api/users/:userId', (req,res) =>{
    const {userId} = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    User.findByIdAndUpdate(userId, req.body, {new: true})
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((error) => res.json(error))
})

//---------------------------------------------------------------------------
//--------------------------DELETE SPECIFIED USER----------------------------
//---------------------------------------------------------------------------

router.delete('/api/users/:userId', (req,res) =>{
    const {userId} = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    
    User.findByIdAndDelete(userId)
        .then(() => res.status(200).json({
            message: `User with ${userId} is removed successfully.`
        }))
        .catch((err) => res.json(err))
})

module.exports = router