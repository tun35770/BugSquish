const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req: any, res: any) => {
    User.find()
        .then((users: any) => res.json(users))
        .catch((err: any) => res.status(400).json("Error: ' + err"));
});

router.route('/add').post((req: any, res: any) => {
    const username = req.body?.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added'))
        .catch((err: string) => res.json('Error: ' + err));
});

router.route('/login').post((req: any, res: any) => {
    res.json({msg: 'login user'});
});

router.route('/signup').post((req: any, res: any) => {

    const signup = async (req:any, res:any) => {
        const {username, email, password} = req.body;

        try {
            const user = await User.signup(username, email, password);

            res.status(200).json({username, email, user})
        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
    }
    
    signup(req, res);
});

export default router;