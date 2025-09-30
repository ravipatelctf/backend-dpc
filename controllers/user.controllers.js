const User = require("../models/user.models");

// -----------------------------------------------------------------------------------

// Create
async function createUser(eventsData) {
    const {name, email, password, events} = eventsData;
    try {
        const newUser = new User({name, email, password, events});
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}

// Read
async function getUser(userEmailId) {
    try {
        const targetUser = await User.findOne({email: userEmailId});
        return targetUser;
    } catch (error) {
        throw error;
    }
}

// -----------------------------------------------------------------------------------

module.exports = {createUser, getUser};