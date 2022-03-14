const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, default:"https://res.cloudinary.com/loudlink/image/upload/v1647284975/loudlink/default_profile_img_n1o8pi.png"},
    description: {type: String, maxlength: 400},
    tags:{type: [String], default: []},
    location: {type: String},
    videos: {type: [String]},
    ownAnnouncements: [{type: Schema.Types.ObjectId, ref:'Announcement', default: []}],
    announcements: [{type: Schema.Types.ObjectId, ref:'Announcement', default: []}],
    ownEvents:[{type: Schema.Types.ObjectId, ref:'Event', default: []}]
  }
);

const User = model("User", userSchema);

module.exports = User;
