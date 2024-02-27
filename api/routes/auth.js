const router = require("express").Router();
const User =require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register",async (req,res)=>{
    
    const pssword= CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
    const newUser=new User(
        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            username:req.body.username,
            img:req.body.img,
            email:req.body.email,
            password:pssword,
        }
    )
    try{
        const savedUser= await newUser.save()
        res.status(201).json (savedUser);
    }
    catch(err){
        res.status(400).json(err);
    }
    })
//LOGIN


router.post("/login",async (req,res)=>{
    
    try{

        const user= await User.findOne({
            username:req.body.username
        })
        var hashedPassword=null,OriginalPassword=null;
        if(user)  hashedPassword= CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        if(user)  OriginalPassword= hashedPassword.toString(CryptoJS.enc.Utf8);
        if(!user)          
            res.status(401).json("Wrong Credentials")
        else if(req.body.password===OriginalPassword)  
        {
            const accessToken =jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin
                },process.env.JWT_SEC,{expiresIn:"3d"});
            const {password, ...others} =user._doc
            res.status(200).json ({...others,accessToken});
        }
        else 
            res.status(401).json("Wrong Credentials") 

  

    }
    catch(err){
        res.status(500).json(err);
    }
    })

module.exports = router