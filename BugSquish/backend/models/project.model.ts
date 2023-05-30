import mongoose from 'mongoose';
import { Schema } from "mongoose";

const projectSchema = new Schema({
    username: {type: String, required: true },
    user_id: {type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    users: { type: Array, required: true },
    bugs: { type: Array, required: true },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;