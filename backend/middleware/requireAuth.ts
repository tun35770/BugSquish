import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const requireAuth = async (req:any, res:any, next:any) => {
    //verify authentication
    const {authorization } = req.headers;

    if (!authorization){
        return res.status(401).json({error: 'Authorization token required.'});
    }
    
    const token = authorization.split(' ')[1]; //zero elem is 'Bearer'
   
    try {

        //DONT TOUCH NEXT 4 LINES, typescript being stupid 0-0
        let decoded:any;
        decoded = jwt.verify(token, process.env.SECRET as string);
        //console.log(decoded)
        const obj = {
            _id: decoded._id
        }
        
        req.user = await User.findOne( obj ).select('_id');
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request not authorized.'})
    }
};

export default requireAuth;