const mongoose = require('mongoose');
const conn = require('../config/db')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },

 
  createdAt: {
    type: Date,
    default: Date.now,
  },

  tokens:[{token:{type:String,require:true}}],
  
  verified: {
    type: Boolean,
    default: false,
  },

  otp: Number,
  otp_expiry: Date,
  resetPasswordOtp: Number,
  resetPasswordOtpExpiry: Date,

 },{
    timestamps: true
  })





  userSchema.pre('save',function(next){
    const salt = bcrypt.genSaltSync(10);
    if(this.password && this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
  }) 



  userSchema.methods.getAuthToken =  async function(data){
    let param = {
      id:this._id,
      email:this.email,
      phone:this.phone
    }
    var tokenValue = jwt.sign(param ,"hssssghsjmQQQisjsnsnbnmmmaxmnmmamsm",{expiresIn:'300000s'})
    this.token = this.tokens.concat({token:tokenValue})
     await this.save();
     return tokenValue;
    }


let users = conn.model('users',userSchema)

module.exports = users
    

