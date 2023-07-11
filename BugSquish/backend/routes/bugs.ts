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
    const user_token = req.body.user_token;  
    const title = req.body.title;
    const description = req.body.description;
    const project = req.body.project;
    const project_id = req.body.project_id;
    const date = Date.parse(req.body.date);
    const completed = req.body.completed || false;

    const newBug = new Bug({
        username,
        user_id,
        title,
        description,
        project,
        project_id,
        date,
        completed,
    });

    newBug.save()
        .then(() => {
            fetch('http://localhost:5000/projects/addbug/' + project_id, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user_token}`
                },
                body: JSON.stringify(newBug)
            })
            .then(() => res.json('Bug added'))
            .catch((err:any) => res.status(400).json('Error: ' + err));
        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req: any, res: any) => {
    Bug.findById(req.params.id)
        .then((bug :any) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req: any, res: any) => {
    const user = req.body.user;
    const project_id = req.body.project_id;

    Bug.findByIdAndDelete(req.params.id)
        .then(() => {

            const data = {
                bug_id: req.params.id
            }

            fetch('http://localhost:5000/projects/deletebug/' + project_id, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            })
            .then(() => res.json('Bug deleted'))
            .catch((err:any) => res.status(400).json('Error: ' + err));

        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req: any, res: any) => {
    const user = req.body.user;
    
    Bug.findById(req.params.id)
        .then((bug: any) => {
            bug.username = user.username;
            bug.title = req.body.title;
            bug.description = req.body.description;
            bug.date = Date.parse(req.body.date);
            bug.completed = req.body.completed ?? false;

            bug.save()
                .then(() => {

                    const data = {
                        newBug: bug,
                        bug_id: bug["_id"]
                    }

                    fetch('http://localhost:5000/projects/updatebug/' + bug.project_id, {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify(data)
                    })
                    .then(() => {
                        res.json('Bug updated')
                    })
                    .catch((err:any) => res.status(400).json('Error: ' + err));
                })
                .catch((err: any) => res.status(400).json('Error: ' + err));
        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/byproject/:id').get((req: any, res: any) => {

    const project_id = req.params.id.toString();
    //console.log(req.user._id);
    Bug.find( {project_id} ).sort({createdAt: -1})
        .then((bugs: any) => res.json(bugs))
        .catch((err: any) => res.status(400).json("Error: ' + err"));
});

export default router;