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

export default router;