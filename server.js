require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbStatus = "Disconnected";

async function connectDB() {
    try {
        await client.connect();
        dbStatus = "Connected to MongoDB";
        console.log(dbStatus);
    } catch (error) {
        dbStatus = "Failed to connect to MongoDB";
        console.error(error);
    }
}

connectDB();

app.get("/", (req, res) => {
    res.send(`Database Connection Status: ${dbStatus}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
