const { User } = require("../models");

const UserController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            res.status(400).json({ message: "Failed to fetch users", error });
            console.log(error)
        }
    },

    // Get a single user by ID and populate thought and friend data
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: "Failed to fetch user", error });
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(400).json({ message: "Failed to create user", error });
        }
    },

    // Update a user by ID
    async updateUserById(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(400).json({ message: "Failed to update user", error });
        }
    },

    // Remove a user by ID
    async deleteUserById(req, res) {
        try {
            const user = await User.findOneAndDelete(req.params.id);
            if (!user) {
                return res.status(400).json({ message: "Failed to delete user" });

            }
            res.json({ message: "User successfully deleted" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(400).json({ message: "Failed to delete user", error });
        }
    },

    // Add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId || req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
            console.log("New friend added");
        } catch (error) {
            res.status(400).json({ message: "Failed to add friend", error });
        }
    },

    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "Friend successfully removed", user });
        } catch (error) {
            res.status(400).json({ message: "Failed to remove friend", error });
        }
    },
};

module.exports = UserController;