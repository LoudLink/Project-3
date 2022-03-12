const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema(
    {
        owner: [{type: Schema.Types.ObjectId, ref:'User'}],
        title: {type: String, required: true},
        description: {type: String, maxlength: 400, required: true},
        image: {type: String, default:"https://cdn-icons.flaticon.com/png/512/2397/premium/2397338.png?token=exp=1647016518~hmac=2af01a418d7d54a5faaa59e3f4938a1b"},
        date: {type: Date, required: true},
        schedule: {type: String, required: true},
        artists: [{type: Schema.Types.ObjectId, ref:'User'}],
        location: {type: String, required: true},
        price: {type: Number},
        tags:[String]
      }

)

const Event = model("Event", eventSchema);

module.exports = Event;