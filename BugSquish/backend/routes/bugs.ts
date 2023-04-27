const router = require('express').Router();
let Bug = require('../models/bug.model');

router.route('/').get((req: any, res: any) => {
    Bug.find()
        .then((bugs: any) => res.json(bugs))
        .catch((err: any) => res.status(400).json("Error: ' + err"));
});

router.route('/add').post((req: any, res: any) => {
    const username = req.body.username;
    const title = req.body.title;
    const description = req.body.description;
    const project = req.body.project;
    const date = Date.parse(req.body.date);

    const newBug = new Bug({
        username,
        title,
        description,
        project,
        date,
    });

    newBug.save()
        .then(() => res.json('Bug added'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

export default router;