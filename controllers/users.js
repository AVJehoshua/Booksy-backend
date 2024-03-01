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


const UsersController = {
    create: create,
    updateUserLikedList: updateUserLikedList
};

module.exports = UsersController;