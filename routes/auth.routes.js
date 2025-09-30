
const express = require("express");
const router = express.Router();
router.use(express.json());


const User = require("../models/user.models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET;

// -------------------------------------------------------------------------------
// user signup
router.post("/signup", async (req, res) => {

    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({"error": "name, email and password are required."});
    }
    const {name, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new User({name, email, password: hashedPassword});
        const savedUser = await newUser.save();
        
        if (!savedUser) {
            return res.status(500).json({"error": "Could not create the user."});
        }
        res.status(201).json({"message": "User created successfully."});

    } catch (error) {
        res
            .status(500)
            .json({"error": "Failed to create user!"});
    }
})

// middleware to verify jwt token for each protectted route
const verifyJWT = async (req, res, next) => {
    const authHeaders = req.headers["authorization"];

    if (!authHeaders) {
        return res.status(401).json({"error": "No token provided."});
    }

    // Extract `token` from frontend res, i.e., `Bearer ${token}`
    const token = authHeaders.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(400).json({"error": "Invalid token."});
    }

}


// user login
router.post("/login", async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"error": "Email and password are required."});
    }
    const {email, password} = req.body;
    try {
        const targetUser = await User.findOne({email});

        if (!targetUser) {
            return res.status(404).json({"error": `user with email ${email} not found.`});
        }

        // compare hashed password with stored password
        const isPasswordValid = await bcrypt.compare(password, targetUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({"error": "Invalid Password."});
        }

        // generate a jwt token
        const token = jwt.sign(
            {userId: targetUser._id, email: targetUser.email},
            JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.status(200).json({token});

    } catch (error) {
        res
            .status(500)
            .json({"error": "Failed to login!"});
    }
})

// -------------------------------------------------------------------------------

module.exports = {router, verifyJWT};