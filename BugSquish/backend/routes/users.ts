const router = require('express').Router();
let User = require('../models/user.model');
import jwt from 'jsonwebtoken'

router.route('/').get((req: any, res: any) => {
    User.find()
        .then((users: any) => res.json(users))
        .catch((err: any) => res.status(400).json("Error: ' + err"));
});

router.route('/:id').get((req: any, res: any) => {
    User.findById(req.params.id)
        .then((user :any) => res.json(user))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req: any, res: any) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

/**Use /signup endpoint to add a user **/
/* router.route('/add').post((req: any, res: any) => {
    const username = req.body?.username;
    const email = req.body?.email;
    const password = req.body?.password;
    const newUser = new User({username, email, password});

    newUser.save()
        .then(() => res.json('User added'))
        .catch((err: string) => res.json('Error: ' + err));
}); */


const createToken = (_id:any) => {
    return jwt.sign({_id}, process.env.SECRET as string, { expiresIn: '7d'});
}

router.route('/login').post((req: any, res: any) => {

    const login = async(req:any, res:any) => {
        const {username, password} = req.body;
        
        try {
            const user = await User.login(username, password);
            const email = user.email;

            //token
            const token = createToken(user._id);
            const user_id = user._id;

            res.status(200).json({username, user_id, email, token})
        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
    }

    login(req, res);
});

router.route('/signup').post((req: any, res: any) => {

    const signup = async (req:any, res:any) => {
        const {username, email, password} = req.body;

        try {
            const user = await User.signup(username, email, password);
            const user_id = user._id;

            //token
            const token = createToken(user._id);

            res.status(200).json({username, user_id, email, token})
        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
    }
    
    signup(req, res);
});

export default router;