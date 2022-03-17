const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const AnnouncementSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String},
  description: { type: String, maxlength: 400 },
  owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  accepted: [{ type: Schema.Types.ObjectId, ref: "User" }],
  announcementDate: { type: Date },
  expirationDate: { type: Date },
  active: { type: Boolean },
  tags: [String],
  location: { type: String },
});

const Announcement = model("Announcement", AnnouncementSchema);

module.exports = Announcement;
