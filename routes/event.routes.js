const {createEvent, getAllEvents} = require("../controllers/event.controllers");
const express = require("express");
const router = express.Router();
router.use(express.json());

// ---------------------------------------------------------------------------------

// Create
router.post("/", async (req, res) => {
    if (!req.body.name || !req.body.dateTime || !req.body.location) {
        return res
            .status(400)
            .json({error: "name, data, time and location are required."});
    }
    try {
        const newEvent = await createEvent(req.body);
        if (!newEvent) {
            return res
                .status(500)
                .json({"error": "Event could not be created!"});
        }
        res
            .status(201)
            .send(newEvent);

    } catch (error) {
        res
            .status(500)
            .json({"error": "Failed to create event"});
    }
});

// Read
router.get("/", async (req, res) => {
    try {
        const allEvents = await getAllEvents();
        if (!allEvents) {
            return res
                .status(404)
                .json({error: "Events not found!"});
        }
        res
            .status(200)
            .send(allEvents);

    } catch (error) {
        res
            .status(500)
            .json({"error": "Failed to fetch all events!"});
    }
})

// Update


// Delete

// ---------------------------------------------------------------------------------

module.exports = router;