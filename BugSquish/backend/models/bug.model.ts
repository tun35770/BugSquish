import mongoose from 'mongoose';
import { Schema } from "mongoose";

const bugSchema = new Schema({
    username: {type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    project: {type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, required: true},
}, {
    timestamps: true,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;