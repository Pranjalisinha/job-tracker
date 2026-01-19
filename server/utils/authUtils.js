import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const generateHashPassword = async (password) => {
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

return hashedPassword;
};

export const generateToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:'7d'});
}