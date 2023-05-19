const router = require('express').Router();
let Bug = require('../models/bug.model');
import requireAuth from '../middleware/requireAuth'

//require authentication for all bug routes
router.use(requireAuth);

router.route('/').get((req: any, res: any) => {

    const user_id = req.user._id.toString();
    //console.log(req.user._id);
    Bug.find( {user_id} ).sort({createdAt: -1})
        .then((bugs: any) => res.json(bugs))
        .catch((err: any) => res.status(400).json("Error: ' + err"));
});

router.route('/add').post((req: any, res: any) => {

    const username = req.body.username;
    const user_id = req.body.user_id;    
    const title = req.body.title;
    const description = req.body.description;
    const project = req.body.project;
    const date = Date.parse(req.body.date);
    const completed = req.body.completed || false;

    const newBug = new Bug({
        username,
        user_id,
        title,
        description,
        project,
        date,
        completed,
    });

    newBug.save()
        .then(() => res.json('Bug added'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req: any, res: any) => {
    Bug.findById(req.params.id)
        .then((bug :any) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req: any, res: any) => {
    Bug.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bug ticket deleted.'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req: any, res: any) => {
    Bug.findById(req.params.id)
        .then((bug: any) => {
            bug.username = req.body.username;
            bug.title = req.body.title;
            bug.description = req.body.description;
            bug.project = req.body.project;
            bug.date = Date.parse(req.body.date);
            bug.completed= req.body.completed || false;

            bug.save()
                .then(() => res.json('Bug ticket updated'))
                .catch((err: any) => res.status(400).json('Error: ' + err));
        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

export default router;