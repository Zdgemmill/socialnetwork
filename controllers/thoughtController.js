const { Thought, User, Reaction } = require("../models");
const { Types } = require("mongoose");

const ThoughtController = {

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (error) {
            console.error("Error creating thought:", error);
            res.status(400).json({ message: "Failed to create thought", error });
        }
    },
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(400).json({ message: "Failed to fetch thoughts", error });
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(thought);
            }
        } catch (error) {
            res.status(400).json({ message: "Failed to fetch thought", error });
        }
    },


    // Update a thought by its ID
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "No Thought Found" });
            } else {
                res.json(thought);
            }
        } catch (error) {
            res.status(400).json({ message: "Failed to update thought", error });
        }
    },

    // Remove a thought by its ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            res.status(200).json(thought);
        } catch (error) {
            res.status(400).json({ message: "Failed to delete thought", error });
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            res.json(thought);
        } catch (error) {
            res.status(400).json({ message: "Failed to add reaction", error });
        }
    },

    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { new: true }
            );
            res.json(thought);
        } catch (error) {
            res.status(400).json({ message: "Action failed", error });
        }
    },
};

module.exports = ThoughtController;