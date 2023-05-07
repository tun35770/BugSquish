import mongoose from 'mongoose';
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

userSchema.statics.signup = async function (username, email, password) {

    let exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use.');
    }

    exists = await this.findOne({ username })
    if (exists) {
        throw Error('Username already in use.');
    }

    //salt + hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash});

    return user;
}

const User = mongoose.model('User', userSchema)

module.exports = User;