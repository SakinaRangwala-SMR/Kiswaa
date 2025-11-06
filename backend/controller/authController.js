import User from "../model/userModel.js"; // Updated path../userModel.js
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { genToken, genToken1 } from '../config/token.js';

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Enter valid Email' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Enter Strong Password' });
        }
        let hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashPassword });
        let token = await genToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json(user);
    } catch (error) {
        console.log('signUp error:', error);
        return res.status(500).json({ message: `registration error: ${error.message}` });
    }
};

export const login = async (req,res) =>{

    try{
        let {email,password} =req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({ message: 'Incorrect password' });
        }
        let token = await genToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json(user);

    }catch(error){
    console.log("login error:", error);
    return res.status(500).json({ message: `login error: ${error.message}` });

    }
}
export const logout = async (req, res) => {
  try {
    console.log("🔔 Logout route triggered");

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
    });

    return res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log("logout error:", error);
    return res.status(500).json({ message: `logout error: ${error.message}` });
  }
};

export const googleLogin = async (req,res) => {
    try{
    let {name,email} = req.body
     let user = await User.findOne({email})
        if(!user){
            user= await User.create({
                name,email
            })
        }
        let token = await genToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json(user);
    }catch(error){
         console.log("google login error", error);
    return res.status(500).json({ message: `google login error: ${error.message}` });
    }
}



export const adminLogin = async (req,res) => {
    try {
        let {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        let token = await genToken1(email)
        res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json(token)
        }
        return res.status(400).json({message:"Invaild creadintials"})

    } catch (error) {
        console.log("AdminLogin error")
    return res.status(500).json({message:`AdminLogin error ${error}`})
        
    }}
