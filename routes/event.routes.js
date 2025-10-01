const {createEvent, getEventsByUserEmail} = require("../controllers/event.controllers");
const express = require("express");
const router = express.Router();
router.use(express.json());

// ---------------------------------------------------------------------------------

// Create
router.post("/:userEmail", async (req, res) => {
    try {
        const newEvent = await createEvent(req.params.userEmail, req.body);
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
router.get("/:userEmail", async (req, res) => {
    try {
        const allEvents = await getEventsByUserEmail(req.params.userEmail);
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