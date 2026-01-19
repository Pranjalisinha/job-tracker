import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const protect = async (req, resizeBy, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error("Error in auth middleware:", error);
            res.status(401).json({status:'failed', message:'Not authorized, token failed'});
        }
    } else {
        res.status(401).json({status:'failed', message:'Not authorized, no token'});
    }
}
export default protect;