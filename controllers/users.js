const User = require("../models/user");
const welcomeEmail = require("./../email/mailer");

async function create(evt) {
    try {
        const first_name = evt.data.first_name;
        const last_name = evt.data.last_name;
        const email = evt.data.email_addresses[0].email_address;
        const user_id = evt.data.id;

            const newUser = new User({ first_name, last_name, email, user_id });
            await newUser
                .save()
                .then((user) => {
                console.log("User created, id:", user._id.toString());
                // This triggers the welcome email once a user has been created
                welcomeEmail() 
                return res.status(201).json({ message: 'User created' });
            })
    } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "Something went wrong" })
    }
}

// function updates saved_items list when a book is liked 
const updateUserLikedList = async (req, res) =>  { 
    const bookId = req.body.bookId;
    const user_id = req.body.user_id;
    const status = req.body.status; 

    const user = await User.findOne(user_id)

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
};

// function checks if book is liked when user navigates to a book page
const checkLikedBook = async (req, res) => {

    const bookId = req.body.bookId;
    const user_id = req.body.user_id;

    const user = await User.findOne(user_id)

    if (!user) {
        return res.status(404).json({ message: "Unable to find user by user_id"})
    }; 
    
    if (user.saved_items.includes(bookId)) {
        return res.status(200).json({ true: true, message: "Book is liked"})
    }
    else {
        return res.status(404).json({ false: false, message: "Book is not liked"})
    }
    
}


const UsersController = {
    create: create,
    updateUserLikedList: updateUserLikedList,
    checkLikedBook: checkLikedBook,
    
};

module.exports = UsersController;