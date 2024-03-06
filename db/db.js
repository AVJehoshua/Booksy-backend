const mongoose = require("mongoose");
require("dotenv").config()


const connectToDatabase = async () => {
    const mongoDbUrl = process.env.MONGODB_URL;

    const testMongoDbUrl = process.env.MONGODB_TEST_URL;

    if (!mongoDbUrl) {
        console.error(
        "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
        );
        throw new Error("No connection string provided");
    }

    await mongoose.connect(mongoDbUrl);

    if (process.env.NODE_ENV !== "test") {
        console.log("Successfully connected to MongoDB");
    }
    };

    connectToDatabase()

module.exports = { connectToDatabase };