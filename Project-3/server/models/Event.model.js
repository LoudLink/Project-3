const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema(
    {
        category: {type: String, required: true, unique: true},
        owner: [{type: Schema.Types.ObjectId, ref:'User'}],
        title: {type: String, required: true},
        description: {type: String, maxlength: 400},
        img: [String],
        date: {type: Date},
        schedule: {type: Date},
        artists: [{type: Schema.Types.ObjectId, ref:'Artist'}],
        location: {type: String},
        price: {type: Number},
        tags:[String]
      }

)

const Session = model("Session", eventSchema);

module.exports = Session;