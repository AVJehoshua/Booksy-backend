const User = require("../models/user");

const create = async (req, res) => {
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.email; 

    const newUser = new User({ first_name, last_name, email});
    newUser
        .save()
        .then((user) => {
            console.log("User created, id:", user._id.toString());
            return res.status(201).json({ message: 'User created' });
            })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({ message: "Something went wrong" });
            });
}


const getUserById = async (req, res) => {
    const userId = req.params.user_id;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user); // Sends all user details back
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error retrieving user details" });
        });
};

const UsersController = {
    create,
    getUserById
};

module.exports = UsersController;