const mongoose = require('mongoose');
const conn = require('../config/db')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const  otpShema  = new mongoose.Schema({
    
    email: String,
    code : String,
    expireIn: Number
    
  
  },{
    timestamps: true
  })

  let otp = conn.model('otp',otpShema ,'otp');

module.exports = otp;
