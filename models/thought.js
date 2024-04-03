const mongoose = require("mongoose");
const reactionSchema = require("./reaction");

const { Schema, model } = mongoose;

// Define the Thought schema
const thoughtSchema = new Schema(
    {
        // Text content of the thought
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // Timestamp indicating when the thought was created
        createdAt: {
            type: Date,
            default: Date.now,
            // Define a getter method to format the timestamp
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        // Username of the user who posted the thought
        username: {
            type: String,
            required: true,
        },
        // Reactions (replies) to the thought
        reactions: [reactionSchema], // Array of nested documents created with the reactionSchema
    },
    {
        // Specify options for the schema
        toJSON: {
            getters: true, // Use getter methods when converting to JSON
            virtuals: true, // Include virtual properties in JSON output
        },
        _id: false, // Disable the default '_id' field
    }
);

// Define a virtual property called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// Create the Thought model
const Thought = model("Thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;