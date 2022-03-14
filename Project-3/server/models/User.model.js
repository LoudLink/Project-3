const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, default:"https://cdn-icons.flaticon.com/png/512/668/premium/668709.png?token=exp=1647272218~hmac=8321cfe7f0b22b5f1ac94b749bfa5297"},
    description: {type: String, maxlength: 400, default:"Hi! I'm new in LoudLink and ready to hear from you :)"},
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
