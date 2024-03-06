// routes/users.js

const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.patch("/like", UsersController.updateUserLikedList);
router.get("/liked", UsersController.checkLikedBook);
router.post("/", UsersController.create);
router.get("/:user_id", UsersController.getUserById);
router.patch("/:user_id", UsersController.updateUser);

module.exports = router;
