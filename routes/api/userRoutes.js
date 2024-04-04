const express = require("express");
const userController = require("../../controllers/userController");

// Create a new router instance
const router = express.Router();

// Define routes for handling users
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUserById);
router.delete("/:userId", userController.deleteUserById);

router.post("/:userId/friends/:friendId", userController.addFriend);
router.delete("/:userId/friends/:friendId", userController.removeFriend);

// Export the router
module.exports = router;