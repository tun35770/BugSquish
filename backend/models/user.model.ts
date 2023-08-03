import mongoose from 'mongoose';
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

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

    //validation
    if (!username || !email || !password ){
        throw Error('All fields must be filled.');
    }
    if (!validator.isEmail(email)){
        throw Error('Email field must contain a valid email address.')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough.')
    }

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

userSchema.statics.login = async function(username, password) {
    if (!username || !password){
        throw Error('All fields must be filled.');
    }

    const user = await this.findOne({ username });

    if (!user) {
        throw Error('Incorrect username');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match){
        throw Error('Incorrect password.');
    }

    return user;
}

const User = mongoose.model('User', userSchema)

module.exports = User;
export default User;