const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;


const userSchema = new Schema(
    {

        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (email) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
                },
                message: "Invalid email address",
            },
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {

        toJSON: {
            virtuals: true,
        },

    }
);


userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);


module.exports = User;