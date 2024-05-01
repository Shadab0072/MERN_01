const express = require("express");
const User = require("../models/user-model")
const bcrypt = require("bcryptjs")


const home = (req,res)=>{
    res.send(" please complete home page ")
}

const register= async (req,res)=>{
    try{
       
        const {username,email,phone,password} = req.body;

        const userExist = await User.findOne({email})     //email:email....key:value

        
        if(userExist){
            return res.status(400).json({ message : "email already exist"})
        }

        const userCreated = await User.create({username,email,phone,password})

        const token = await userCreated.generateToken();
        ////await userCreated.save();
        res.status(201).json({
             message : 'REGISTRATION SUCCESSFUL' , 
             token,
             userId:userCreated._id.toString(),
            
        })}


    catch(error){
        res.status(500).json("internal server error")
        console.log(error);
    }
   
}


//login-section

const login = async (req,res)=>{

    try {
       const {email,password} = req.body
       const userExist = await User.findOne({email})
       ////console.log(userExist)
       if(!userExist){
        return res.json({ message: "invalid email"})
       }

       const pwdCheck = await bcrypt.compare( password, userExist.password )
       ////console.log(pwdCheck)

       if(pwdCheck){
        res.status(200).json({
            message : 'LOGIN SUCCESSFUL' , 
            token:await userExist.generateToken(),
            userId:userExist._id.toString(), 
       });
       }else{
        res.status(404).json("invalid password")
       }    
    }
     catch (error) {
        res.json("login internal error")
    }
}



//user logic......

const user = async (req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({userData});
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };



module.exports = {home,register,login,user}