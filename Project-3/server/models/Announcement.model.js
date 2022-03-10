const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const AnnouncementSchema = new Schema(
    {
        category: {type: String, required: true, unique: true},
        title: {type: String, required: true},
        img: [{type: Schema.ObjectId, ref: "User"}],
        description: {type: String, maxlength: 400},
        owner: [{type: Schema.Types.ObjectId,ref:'User'}],
        participants: [{type: Schema.Types.ObjectId,ref:'User'}],
        eventDate: {type: Date},
        expiracyDate: {type: Date},
        active: {type: Boolean},
        tags:[String]
      }


)

const Session = model("Session", AnnouncementSchema);

module.exports = Session;