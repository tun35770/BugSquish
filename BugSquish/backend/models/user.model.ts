import mongoose from 'mongoose';
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema)

module.exports = User;