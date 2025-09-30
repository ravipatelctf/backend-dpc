const Event = require("../models/event.models");
const mongoose = require("mongoose");


// -------------------------------------------------------------------------

// Create
async function createEvent(eventsData) {
    const {name, dateTime, location, description} = eventsData;
    try {
        const newEvent = new Event({name, dateTime, location, description});
        const savedEvent = await newEvent.save();
        return savedEvent;
    } catch (error) {
        throw error;
    }
}

// Read
async function getAllEvents() {
    try {
        const allEvents = await Event.find();
        return allEvents;
    } catch (error) {
        throw error;
    }
}

// Update


// Delete


// -------------------------------------------------------------------------

module.exports = {createEvent, getAllEvents};