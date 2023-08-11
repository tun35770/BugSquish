import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const router = require('express').Router();

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//MongoDB Connection
const uri = process.env.ATLAS_URI || '';
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

router.route('/').get((req: any, res: any) => {
    res.json("Hi");
});

//Routes
import bugsRouter from './routes/bugs';
import usersRouter from './routes/users';
import projectsRouter from './routes/projects';

app.use('/bugs', bugsRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});