import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateHashPassword, generateToken } from '../utils/authUtils.js';

export const registerUser = async (req, res)=>{
    const {name, email, password} = req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).json({status:'failed', message:'Please provide all  required fields'});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({status:'failed', message:'User already exists'});
        }
        const hashedPassword = await generateHashPassword(password);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        const token = generateToken(newUser._id);
        const userData = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };
        return  res.status(201).json({status:'success', message:'User registered successfully', data:{user: userData, token:token}});
    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({status:'failed', message:'Internal server error'});
    }
}

export const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({status:'failed', message:'Please provide all  required fields'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({status:'failed', message:'Invalid email not exists'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({status:'failed', message:'Invalid password'});
        }
        const token = generateToken(user._id);
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email
        };
        return res.status(200).json({status:'success', message:'User logged in successfully', data:{user: userData, token:token}});
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({status:'failed', message:'Internal server error'});
    }
}