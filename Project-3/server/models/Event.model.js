const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema(
    {

        owner: [{type: Schema.Types.ObjectId, ref:'User'}],
        title: {type: String, required: true},
        description: {type: String, maxlength: 400},
        image: {type: String, default:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"},
        date: {type: Date},
        schedule: {type: Date},
        artists: [{type: Schema.Types.ObjectId, ref:'User'}],
        location: {type: String},
        price: {type: Number},
        tags:[String]
      }

)

const Event = model("Event", eventSchema);

module.exports = Event;