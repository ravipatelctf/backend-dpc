
const Event = require("../models/event.models");

// -------------------------------------------------------------------------

// Create
async function createEvent(userEmail, eventsData) {
    try {
        const user = await Event.findOne({email: userEmail});
        if (!user) {
            const newEvent = new Event({email: userEmail, events: eventsData});
            const savedEvent = await newEvent.save();
            return savedEvent;   
        } else {
            user.events.push(eventsData);
            const userWithNewEvents =  await user.save();
            return userWithNewEvents;
        }
    } catch (error) {
        throw error;
    }
}

// Read
async function getEventsByUserEmail(userEmail) {
    try {
        const allEvents = await Event.findOne({email: userEmail});
        return allEvents;
    } catch (error) {
        throw error;
    }
}

// -------------------------------------------------------------------------

module.exports = {createEvent, getEventsByUserEmail};