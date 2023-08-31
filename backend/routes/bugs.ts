
const router = require('express').Router();
let Bug = require('../models/bug.model');
import requireAuth from '../middleware/requireAuth'

//require authentication for all bug routes
router.use(requireAuth);

//get all bugs for all projects this user belongs to
router.route('/').post((req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const user = req.body.user;
    const data = {
        user: user
    };

    fetch('https://bugsquish.org/projects', {
          method: 'POST',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(data)
      })
      .then( async (response) => {
        try{
            const userProjects =  await response.json();
            let userBugs: any[] = [];
            for(let i = 0; i < userProjects.length; i++){
                //console.log(userProjects[i].bugs)
                userBugs = [...userBugs, ...userProjects[i].bugs];
            }

            //console.log(userBugs)
            res.json(userBugs);
        } catch(e){
            res.status(400).json("Error: " + e);
        }
      })
});

//get all bugs belonging to this user
router.route('/mybugs/:id').get((req: any, res: any) => {
    const user_id = req.params.id;

    Bug.find( {user_id} )
        .then((bug :any) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err));
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
    const status = req.body.status || "Open";
    const priority = req.body.priority || "High";

    const newBug = new Bug({
        username,
        user_id,
        title,
        description,
        project,
        project_id,
        date,
        status,
        priority,
    });

    newBug.save()
        .then(() => {
            fetch('https://bugsquish.org/projects/addbug/' + project_id, {
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

            fetch('https://bugsquish.org/projects/deletebug/' + project_id, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            })
            .then(() => {
		    res.json('Bug deleted')
            })
            .catch((err:any) => {
                console.error(err);
                res.status(400).json('Error: ' + err)
            });

        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/deleteall/:id').delete((req: any, res: any) => {

    const project_id = req.params.id;

    Bug.deleteMany( {project_id} )
        .then(() => {
            res.json("Project deleted.");
        })
        .catch((err: any) => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req: any, res: any) => {
    const user = req.body.user;
    
    Bug.findById(req.params.id)
        .then((bug: any) => {
            bug.username = req.body.username ?? bug.username;
            bug.title = req.body.title ?? bug.title;
            bug.description = req.body.description ?? bug.description;
            bug.date = Date.parse(req.body.date) ?? bug.date;
            bug.status = req.body.status ?? bug.status;
            bug.priority = req.body.priority ?? bug.priority;

            bug.save()
                .then(() => {
                    const data = {
                        newBug: bug,
                        bug_id: bug["_id"]
                    }

                    fetch('https://bugsquish.org/projects/updatebug/' + bug.project_id, {
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
        .catch((err: any) => res.status(400).json("Error: " + err));
});

router.route('/updateprojecttitle/:id').post((req: any, res: any) => {

    const project_id = req.params.id.toString();
    const new_project_title = req.body.title;
    //console.log(req.user._id);
    Bug.find( {project_id} )
        .then((bugs: any) => {
            
            for(let i = 0; i < bugs.length; i++){
                bugs[i].project = new_project_title;
                bugs[i].save();
            }

            res.json('Bugs updated')
        })
        .catch((err: any) => res.status(400).json("Error: " + err));
});

export default router;
