const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

// router.post("/", UsersController.create);
router.patch("/like", UsersController.updateUserLikedList)
router.get("/liked", UsersController.checkLikedBook)

module.exports = router; 