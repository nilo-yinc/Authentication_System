import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
const registerUser = async(req,res)=>{
    // get data
    //vali date
    // check if user already exixst 
    // create a user in data base 
    // ceate a verification tokaen 
    // send token as email to user 
    // send success status to user 

   const {name, email, password} = req.body
   if (!name || !email || !password){
    return res.status(400).json({
        message: "All fields are required",
    })
   }

 console.log(email)

try {
const existingUser = await User.findOne({email})
if(existingUser){
    return res.status(400).json({
        message : "User already exists " 
    })

}

const user = await User.create({
    name,
    email,
    password,


})
console.log(user);

    if(!user){
        return res.status(400).json({
            message :"User not registered",
        })
    }

    const token = crypto.randomBytes(32).toString("hex")
    console.log(token);
    user.verificationToken = token

   await  user.save()

   //send email
const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

   const mailOption = {
    from: process.env.MAILTRAP_SENDEREMAIL,
    to: user.email,
    subject: "Verify your email",//subject line
    text:`Please click on the following link :
    ${process.env.BASE_URL}/api/v1/users/verify/${token}`,

  };


  await  transporter.sendMail(mailOption)

  res.status(201).json({
    message : "User registered successfully",
    sucess : true
  })
} catch (error) {
     res.status(400).json({
    message : "User not registered",
    error,
    sucess : false,
     });
    
}

};

const verifyUser = async (req, res) => {
  // get token from url
  //validate
  //find user based on the token 
  //set isVerified is true
  // remove verification token 
  // save 
  // return response 
const { token } = req.params;
console.log(token);
if(!token){
  return res.status(400).json({
    messege: "Invalid token",
  });
}
const User = await User.findOne({ verificationToken : token});
if(!user){
  return res.status(400).json({
    messege: "Invalid token",
  });
}
user.isVerified = true;
user.verificationToken = undefined;
await user.save();

};


export {registerUser,  verifyUser};

