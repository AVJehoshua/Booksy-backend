const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.patch("/like", UsersController.updateUserLikedList);
router.get("/liked", UsersController.checkLikedBook);
router.post("/", UsersController.create);

module.exports = router; 