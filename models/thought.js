const mongoose = require("mongoose");
const reactionSchema = require("./reaction");

const { Schema, model } = mongoose;

// Define the Thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },

    }
);


thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});


const Thought = model("Thought", thoughtSchema);


module.exports = Thought;