const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/db.js");
require("dotenv").config();
const { Webhook } = require("svix");
const User = require("./models/user.js");

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
    console.log(WEBHOOK_SECRET)
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

    console.log("I am evt data:", evt.data)

    const first_name = evt.data.first_name;
    const last_name = evt.data.last_name;
    const email = evt.data.email_addresses[0].email_address;

    const newUser = new User({ first_name, last_name, email });
    await newUser
        .save()
        .then((user) => {
            console.log("User created, id:", user._id.toString());
            return res.status(201).json({ message: 'User created' });
            })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({ message: "Something went wrong" });
            });
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
