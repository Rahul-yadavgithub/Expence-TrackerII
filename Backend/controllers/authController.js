const User = require("../model/User.js");

const getToken = require("../configuration/token.js");

const bcrypt = require("bcryptjs");


// Sign Up Authentication 

const signUp = async(req , res )=>{
    let {name, email, password, profileImageUrl} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message : "All Fields Are required"});
    }

    try{
        let userExit = await User.findOne({email});

        if(userExit){
            return res.status(400).json({message : "User is Already Exit "});
        }

        // now if User not exit so we need to hash their password and then send to the client

        let user = await User.create({ name, email, password, profileImageUrl });

        let token = await getToken(user._id);

        res.cookie("token", token,{
            httpOnly : true,
            secure: process.env.NODE_ENVIRONMENT  === "production",
            sameSite : "strict",
            maxAge : 8*24*60*60*1000,
        })

        return res.status(200).json({user,token});

    }
    catch(error){

        return res.status(500).json({message : `Signup Error ${error}`});

    }
};


// Login Authentication 

const login = async(req, res) =>{

    let {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message : "All fields are required"});
    }

    try{

        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message : "User is Not Exit"});
        }

        // Now compare with their password which is stored in the server backend and the pssword which is send by the user which is requesting this 

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
           return res.status(400).json({ message: "Invalid credentials" });
         }

        let token = await getToken(user._id);

        res.cookie("token", token ,{
            httpOnly : true,
            secure : process.env.NODE_ENVIRONMENT === "production",
            sameSite : "strict",
            maxAge : 8*24*60*60*1000,
        })

        return res.status(200).json({user,token});
    }
    catch(error){
        return res.status(500).json({message : `Login Error ${error}`});

    }
};


// Logout Authentication 

const logout = async(req, res) =>{
    try{
        res.clearCookie("token");
        return res.status(201).json({message : "Logout Successfully"});

    }
    catch(error){
        return res.status(500).json({message : `Logout Error ${error}`});

    }

};

module.exports = {signUp, login, logout};