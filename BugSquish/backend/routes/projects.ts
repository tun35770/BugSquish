const router = require('express').Router();
let Project = require('../models/project.model');
import requireAuth from '../middleware/requireAuth'

//require authentication for all bug routes
router.use(requireAuth);

//Get projects
router.route('/').get((req: any, res: any) => {

    const user_id = req.user._id.toString();
    //console.log(req.user._id);
    Project.find( {user_id} ).sort({createdAt: -1})
        .then((projects: any) => res.json(projects))
        .catch((err: any) => res.status(400).json("Error: ' + err"));
});

//Create project
router.route('/add').post((req: any, res: any) => {

    const username = req.body.username;
    const user_id = req.body.user_id;    
    const title = req.body.title;
    const description = req.body.description;
    const userObj = {
        username: req.body.username,
        user_id: req.body.user_id, 
        email: req.body.email,
    };

    const users = new Array(userObj);
    const bugs = new Array(); //initially empty

    const newProject = new Project({
        username,
        user_id,
        title,
        description,
        users,
        bugs,
    });

    newProject.save()
        .then(() => res.json('Project created'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

export default router;