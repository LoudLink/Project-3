const { Schema, model } = require("mongoose");
const { get } = require("../routes/events.routes");
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema(
    {
        owner: [{type: Schema.Types.ObjectId, ref:'User'}],
        title: {type: String, required: true},
        description: {type: String, maxlength: 400, required: true},
        image: {type: String, default:"https://i.imgur.com/dvJsTWT.jpeg"},
        date: {type:Date,default:Date.now},
        schedule: {type: String,default:'19:00'},
        artists: [{type: Schema.Types.ObjectId, ref:'User'}],
        location: {type: String, default:'Barcelona'},
        price: {type: Number,default:0},
        tags:[String]
      }

)

const Event = model("Event", eventSchema);

module.exports = Event;