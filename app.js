const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/db.js");
require("dotenv").config();
const { Webhook } = require("svix");
const UsersController = require("./controllers/users.js")

const app = express();

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

app.use(cors());
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.post("/api", bodyParser.raw({type: 'application/json'}), async (req, res) => {
    // Check if the 'Signing Secret' from the Clerk Dashboard was correctly provided
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error("You need a WEBHOOK_SECRET in your .env");
    }

    // Grab the headers and body
    const headers = req.headers;
    const payload = JSON.stringify(req.body);

    // Get the Svix headers for verification
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    // If there are missing Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        res.status(400).send("Error occurred -- no svix headers");
        return;
    }

    // Initiate Svix
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and return error code
    try {
      evt = wh.verify(payload, headers);
    } catch (err) {
      // Console log and return error
      console.log("Webhook failed to verify. Error:", err.message);
      res.status(400).json({
        success: false,
        message: err.message,
      });
      return;
    }

    // Below can be used for debugging: 
      // Grab the ID and TYPE of the Webhook
      const { id } = evt.data;
      const eventType = evt.type;

      console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
      // Console log the full payload to view
      console.log("Webhook body:", evt.data);

    res.status(200).json({
      success: true,
      message: "Webhook received",
    });

    // User is created in the database as a last step 
    return await UsersController.create(evt)
});


const listenForRequests = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log("Now listening on port", port);
    });
};

connectToDatabase().then(() => {
    listenForRequests();
});
