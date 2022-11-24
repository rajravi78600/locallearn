const Users = require("../models/users")
// const otp = require("../models/otp")
const Signup = require("../models/Signup")

const { json } = require("express");
const messagebird = require('messagebird')('6PBBEVn5eNSq66LuzuaoRXRrC');
var validator = require("email-validator");
var rn = require("random-number");
const bcrypt = require('bcrypt');

const  { createTransport } = require("nodemailer");

const nodemailer = require("nodemailer");
let otp = 0
var jwt = require('jsonwebtoken');
const users = async (req,res)  => {
    

}



// nodemiller mail system


const sendMail = async (email, subject, text) => {

    const transport = createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f8f25657c316ca",
        pass: "362d1a8cdf173f"
      },
    });
  
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      text,
    });
  };






const  singup  = async (req , res) => {
  try {
       
    const name =req.body.name;
    const username=req.body.username;
    const email =req.body.email;
    const password =req.body.password;

    let user = await Users.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(Math.random() * 1000000);
    console.log(otp)



     let data = await Users.create({
      name,
      username,
      email,
      password,
      otp,
      otp_expiry: new Date(Date.now() + 5 * 60 * 1000),
      
    });



    let response = await data.save();
    let myToken = await data.getAuthToken();
    res.status(200).json({ message: 'ok', token: myToken })
  
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
    

        

//otpverify
const otpverify = async (req,res) => {
  if (!req.body.email) {
    res.json({ msg: "EMAIL_EMPTY" });
    return;
  }
  Users.findOneAndUpdate(
    { email: req.body.email, otp: req.body.otp },
    { verified: true, updated_at: Date.now() },
    (err, result) => {
      if (err) throw err;
      // console.log(result);
      if (result == null) {
        res.send({ msg: "OTP_UNMATCHED" });
      } else {
        res.send({ msg: "OTP_MATCHED" });
        //Next Step is to set password. But that all wiil go to Users Collection.
        //The signup collection is only for doing the OTP/Verification purpose.
      }
    }
  );
}









const singin = async(req,res) => {

    if (!req.body.email || !req.body.password) {
        res.status(301).json({ message: 'Error', message: 'please select email/password' })
      }
      let user = await Users.findOne({  email: req.body.email });
       const responseType = {
        message: 'ok'
      }

      if(user){
        // var match = await bcrypt.compare(req.body.password, user.password)
        var match = bcrypt.hashSync(req.body.password, 10);
        if(match){
            let myToken = await user.getAuthToken();
            responseType.message = 'login sucessfully';
            responseType.token = myToken;
        }else
        {
            responseType.message = 'Invalid Password';
        }
    }else{
        responseType.message = 'nvalid Email ID';
    }

    console.log(user);
    res.status(200).json({message: 'ok', data: responseType});
      }







//forget password,

// const emailSend = async (req,res) => {
//     let data = await Users.findOne({email:req.body.email})
//     const responseType = {};
//     if(data){
//         let otpcode = Math.floor((Math.random()*10000)+1);
//         let otpData = new otp({
//             email:req.body.email,
//             code:otpcode,
//             expireIn: new Date().getTime()+ 300*1000
//         })
//         let otpResponese = await otpData.save();
//         responseType.statusText = 'Success'
//         responseType.message = 'chack email id'
        
//     }else{
//         responseType.statusText = 'error'
//         responseType.message = 'Email id not vaild'
//     }


//     res.status(200),json("ok")
// }



const logout = async (req,res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}




module.exports = {
    users,
    singup,
    singin,
    otpverify,
    logout
    }