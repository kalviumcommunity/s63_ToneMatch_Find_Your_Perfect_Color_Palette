const mongoose = require("mongoose");

const connectDatabase = () => {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
        console.error("❌ MongoDB URI is missing! Check your .env file.");
        return;
    }

    mongoose
        .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`✅ MongoDB connected: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`❌ Database connection failed: ${err.message}`);
        });
};

module.exports = connectDatabase;
