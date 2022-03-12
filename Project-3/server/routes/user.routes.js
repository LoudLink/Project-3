const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
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

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
});

//---------------------------------------------------------------------------
//--------------------------EDIT SPECIFIED USER------------------------------
//---------------------------------------------------------------------------

router.put("/:userId", fileUploader.single("image"), (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
    const { username, description, tags, location, videos } = req.body
    console.log(req.body)
    const image = req.file && req.file.path;
    let usernameToLowerCase = username.toLowerCase();
    
  User.findByIdAndUpdate(userId, { username: usernameToLowerCase, image, description, tags, location, videos }, { new: true })
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((error) => res.json(error));
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

  User.findByIdAndDelete(userId)
    .then(() =>
      res.status(200).json({
        message: `User with ${userId} is removed successfully.`,
      })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
