const User = require("../models/user");
const welcomeEmail = require("./../email/mailer");
require("dotenv").config();
const { Webhook } = require("svix");

const create = async (req, res) => {
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

    const first_name = evt.data.first_name;
    const last_name = evt.data.last_name;
    const email = evt.data.email_addresses[0].email_address;
    const user_id = evt.data.id;

    const newUser = new User({ first_name, last_name, email, user_id});
    await newUser
        .save()
        .then((user) => {
            console.log("User created, id:", user._id.toString());
            welcomeEmail(email).catch(console.error)
            return res.status(201).json({ message: 'User created' });
            })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({ message: "Something went wrong" });
            });
};




// function updates saved_items list when a book is liked 
const updateUserLikedList = async (req, res) =>  { 
    console.log(req.body)
    const bookId = req.body.bookId;
    const user_id = req.body.user_id;
    const status = req.body.status; 

    try {
        const user = await User.findOne({ user_id: user_id })

        if (!user) {
            return res.status(404).json({ message: "Unable to find user by user_id"})
        }; 
        
        if (user.saved_items.includes(bookId) && status === "unlike") {
            user.saved_items = user.saved_items.filter(id => id !== bookId)
        }
        else if (user.saved_items.includes(bookId) && status === "like") {
            user.saved_items 
        }
        else if (!user.saved_items.includes(bookId) && status === "like") {
            user.saved_items.push(bookId)
        }
        
        await user.save();
        console.log(user.saved_items)

        return res.status(200).json({ message: "User updated successfully" });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "User not updated" });
    };
};

// function checks if book is liked when user navigates to a book page
const checkLikedBook = async (req, res) => {

    const bookId = req.query.bookId;
    const user_id = req.query.user_id;

    const user = await User.findOne({ user_id: user_id })

    if (!user) {
        return res.status(404).json({ message: "Unable to find user by user_id"})
    }; 
    
    if (user.saved_items.includes(bookId)) {
        return res.status(200).json({ state: true, message: "Book is liked"})
    }
    else {
        return res.status(200).json({ state: false, message: "Book is not liked"})
    }
    
}


const getUserById = async (req, res) => {
    const userId = req.params.user_id;
    console.log("[getUserById] Attempting to fetch user with user_id:", userId);

    try {
        const user = await User.findOne({ user_id: userId });
        console.log("[getUserById] { user_id: userId }:", { user_id: userId });
        // console.log( typeof userId );
        if (!user) {
            // console.log("[getUserById] User not found with user_id:", userId);
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log("[getUserById] User found:", user); // Be cautious of logging sensitive info
        res.json(user);
    } catch (err) {
        // console.error("[getUserById] Error retrieving user details for user_id:", userId, err);
        res.status(500).json({ message: "Error retrieving user details", error: err.message });
    }
};

const UsersController = {
    create: create,
    getUserById: getUserById,
    updateUserLikedList: updateUserLikedList,
    checkLikedBook: checkLikedBook,
};

module.exports = UsersController;