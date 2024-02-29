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
const UsersController = {
    create: create
};

module.exports = UsersController;