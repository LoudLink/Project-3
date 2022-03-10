const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    category: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String},
    description: {type: String, maxlength: 400},
    tags:[String],
    location: {type: String},
    videos: {type: String},
    ownAnnouncements: [{type: Schema.Types.ObjectId, ref:'Announcement'}],
    announcements: [{type: Schema.Types.ObjectId, ref:'Announcement'}],
    ownEvents:[{type: Schema.Types.ObjectId, ref:'Event'}]
  }
);

const User = model("User", userSchema);

module.exports = User;
