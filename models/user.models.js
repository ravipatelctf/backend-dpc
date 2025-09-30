const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]
},
{
    timestamps: true,
},
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;