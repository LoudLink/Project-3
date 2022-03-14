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

    .populate("ownEvents")

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

    const { username, description, tags, location, videos } = req.body

    let usernameToLowerCase = username.toLowerCase();

    console.log(req.file)



  User.findByIdAndUpdate(userId, { username: usernameToLowerCase, description, tags, location, videos }, { new: true })

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

  let countAnno = 0;
  let countEve = 0;
  const userIdCopy = userId;

  function deleteAnnouncements() {
    Announcement.find()
    .populate("owner")
    .then((anno) => {
      anno.map((annito) => {
        if(annito.owner.toString().includes(userIdCopy)){
          Announcement.findByIdAndDelete(annito._id)
          .then(
            console.log("Announcement deleted")
          )
        }
        else {
          countAnno += 1;
          console.log("Announcements checked: ", countAnno);
        }
      })
    })
  }

  function deleteEvents() {
    Event.find()
    .populate("owner")
    .then((eve) => {
      eve.map((evito) => {
        if(evito.owner.toString().includes(userIdCopy)){
          Event.findByIdAndDelete(evito._id)
          .then(
            console.log("Event deleted")
          )
        }
        else {
          countEve += 1;
          console.log("Events checked: ", countEve);
        }
      })
    })
  }

  function deleteUser() {
    User.findByIdAndDelete(userId)
                          .then(() => {
                            res.status(200).json({
                              message: `User with ${userId} is removed successfully.`,
                            });
                          })
                          .catch((err) => res.json(err))
                        
  }

  function deleteAnnouncementsAndEvents() {
    deleteAnnouncements()
    deleteEvents();
  }

  deleteAnnouncementsAndEvents()
  setTimeout(() => {
    deleteUser()
  }, 1000)
})

  /*
  Announcement.find()
    .populate("owner")
    .then((anno) => {
      Promise.all(
        anno.map((annito) => {
          if (annito.owner.toString().includes(userId)) {
            Announcement.findByIdAndDelete(annito._id).then(
              Event.find()
                .populate("owner")
                .then((eve) => {
                  eve.map((evito) => {
                    if (evito.owner.toString().includes(userId)) {
                      Event.findByIdAndDelete(evito._id).then(
                        User.findByIdAndDelete(userId)
                          .then(() => {
                            res.status(200).json({
                              message: `User with ${userId} is removed successfully.`,
                            });
                          })
                          .catch((err) => res.json(err))
                      );
                    }
                  });
                })
            );
          } 
          
          else {
            countAnno += 1;
            console.log("Announcements checked: ", countAnno);
          }
        })
      ).then(
        Event.find()
          .populate("owner")
          .then((eve) => {
            Promise.all(
              eve.map((evito) => {
                if (evito.owner.toString().includes(userId)) {
                  Event.findByIdAndDelete(evito._id).then(
                    User.findByIdAndDelete(userId)
                      .then(() => {
                        res.status(200).json({
                          message: `User with ${userId} is removed successfully.`,
                        });
                      })
                      .catch((err) => res.json(err))
                  );
                } else {
                  countEve += 1;
                  console.log("Events checked: ", countEve);
                }
              })
            )
            .then(
              User.findByIdAndDelete(userId)
                .then(() => {
                  res.status(200).json({
                    message: `User with ${userId} is removed successfully.`,
                  });
                })
                .catch((err) => res.json(err))
            );
          })
      );
    });
});

*/

/*Announcement.find()
    .populate("owner")
    .then((anno) => {
      anno.map((annito) => {
        if (annito.owner.toString().includes(userId)) {
          Announcement.findByIdAndDelete(annito._id).then(
            Event.find()
              .populate("owner")
              .then((eve) => {
                eve.map((evito) => {
                  if (evito.owner.toString().includes(userId)) {
                    Event.findByIdAndDelete(evito._id).then(
                      User.findByIdAndDelete(userId)
                        .then(() => {
                          res.status(200).json({
                            message: `User with ${userId} is removed successfully.`,
                          });
                        })
                        .catch((err) => res.json(err))
                    );
                  }
                });
              })
          );
        }
      });
    }); */

module.exports = router;
