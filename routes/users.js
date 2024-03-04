// routes/users.js

const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.post("/", UsersController.create);

router.get("/:user_id", UsersController.getUserById);

module.exports = router;
