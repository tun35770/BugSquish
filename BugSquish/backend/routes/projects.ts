const router = require('express').Router();
let Project = require('../models/project.model');
import requireAuth from '../middleware/requireAuth'
import nodemailer from 'nodemailer';

//nodemailer for inviting users to a project
const sendInviteMail = async (receiverEmail: string, 
                                projectName: string,
                                senderUsername: string, 
                                inviteLink: string) => {
    const transporter = nodemailer.createTransport({
        service:'hotmail',
        auth: {
            user: 'bugsquish@outlook.com',
            pass: '9K2tvhhqjmf29644!'
        }
    });

    const info = transporter.sendMail({
        from: 'BugSquish <BugSquish@outlook.com',
        to: receiverEmail,
        subject: `You've been invited to a BugSquish project`,
        html: `<p> Hello from BugSquish, </p>
                <p> You have been invited to the project ${projectName}
                    by ${senderUsername}. </p>
                <p> Click the link below to accept the invite and be added as a member of
                    the project. </p>
                <p> ${inviteLink} </p>`,
    }, (err, data) => {
        if(err)
            console.error(err);
        else    
            console.log("Sent: " + data.response)
    });
}

//require authentication for all bug routes
router.use(requireAuth);

//Get projects
router.route('/').get( async (req: any, res: any) => {

    const user_id = req.user._id.toString();
    //console.log(req.user._id);
    /* Project.find( {user_id} ).sort({createdAt: -1})
        .then((projects: any) => res.json(projects))
        .catch((err: any) => res.status(400).json("Error: ' + err")); */

    const usersProjects = [];
    for await (const doc of Project.find()){
        for(let i = 0; i < doc.users.length; i++){
            if(doc.users[i].user_id === user_id){
                usersProjects.push(doc);
                break;
            }
        }
    }

    console.log(usersProjects);

    res.json(usersProjects);
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

router.route('/:id').get((req: any, res: any) => {
    Project.findById(req.params.id)
        .then((project :any) => res.json(project))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req: any, res: any) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project deleted.'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req: any, res: any) => {
    Project.findById(req.params.id)
        .then((project: any) => {
            project.title = req.body.title;
            project.description = req.body.description;
            project.date = Date.parse(req.body.date);
            
            project.save()
                .then(() => res.json('Project updated'))
                .catch((err: any) => res.status(400).json('Error: ' + err));
        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/sendinvite/:id').post((req: any, res: any) => {
    Project.findById(req.params.id)
        .then((project: any) => {
            /*
            receiverEmail: string, 
            projectName: string,
            senderUsername: string, 
            inviteLink: string
            */
           const receiverEmail = req.body.receiverEmail;
           const projectName = project.title;
           const senderUsername = req.body.user.username;
           //link should bring user to a page in client that will immediately fetch adduser hook
           const inviteLink = 'http://localhost:5173/acceptinvite/' + req.params.id;

           sendInviteMail(receiverEmail, projectName, senderUsername, inviteLink)
           .then(() => res.json('Email sent!'))
           .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/adduser/:id').post((req: any, res: any) => {
    Project.findById(req.params.id)
        .then((project: any) => {
            const projectUsers = project.users;
            const user = req.body;
            let userAlreadyExists = false;

            for(let i = 0; i < projectUsers.length; i++){
                if(projectUsers[i].user_id === user["user_id"]){
                    userAlreadyExists = true;
                    break;
                }
            }

            if(!userAlreadyExists){
                console.log(user)
                project.users.push(user);

                project.save()
                .then(() => res.json('Project updated'))
                .catch((err: any) => res.status(400).json('Error: ' + err));
            }

            else{
                res.status(400).json('Error: User already added to project.');
            }
        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

export default router;