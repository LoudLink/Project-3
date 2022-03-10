const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const AnnouncementSchema = new Schema(
    {
        title: {type: String, required: true},
        image: [{type: Schema.ObjectId, ref: "User"}],
        description: {type: String, maxlength: 400},
        owner: [{type: Schema.Types.ObjectId,ref:'User'}],
        participants: [{type: Schema.Types.ObjectId,ref:'User'}],
        eventDate: {type: Date},
        expirationDate: {type: Date},
        active: {type: Boolean},
        tags:[String]
      }


)

const Announcement = model("Announcement", AnnouncementSchema);

module.exports = Announcement;