const {initializeDatabase} = require("./db/db.connect");
initializeDatabase();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}))

const eventRoutes = require("./routes/event.routes");
const userRoutes = require("./routes/user.routes");
const {router: authRoutes, verifyJWT} = require("./routes/auth.routes");


// 'auth' routes
app.use("/auth", authRoutes);


// 'users' routes
app.use("/users", verifyJWT, userRoutes);


// 'events' routes
app.use("/events", verifyJWT, eventRoutes);


// GET `/` for home page
app.get("/", (req, res) => {
    res
        .status(200)
        .json({message: "Welcome to the home page."});
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
})