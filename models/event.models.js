const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    events: [{
        name: {
            type: String,
            required: true,
        },
        dateTime: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
    }]
},
{
    timestamps: true,
},
);

const Event = mongoose.model("Event", eventSchema, "events");

module.exports = Event;