
const {createUser, getUser} = require("../controllers/user.controllers");
const express = require("express");
const router = express.Router();
router.use(express.json());

// ---------------------------------------------------------------------------
router.post("/", async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"error": "name, email and password are required."});
    }
    try {
        const newUser = await createUser(req.body);
        if (!newUser) {
            return res
                .status(500)
                .json({"error": "Could not create the user."});
        }
        res
            .status(201)
            .json({"message": "User created successfully."});

    } catch (error) {
        res
            .status(500)
            .json({"error": "Failed to create user!"});
    }
})

// Read
router.get("/:userEmailId", async (req, res) => {
    try {
        const targetUser = await getUser(req.params.userEmailId);
        if (!targetUser) {
            return res
                .status(404)
                .json({"error": `user with email id : ${req.params.userEmailId} not found.`})
        }
        res
            .status(200)
            .send(targetUser);

    } catch (error) {
        res
            .status(500)
            .json({"error": `Failed to fetch user with email ${req.params.userEmailId}`})
    }
})

// ---------------------------------------------------------------------------

module.exports = router;