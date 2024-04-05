const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema=mongoose.Schema

const UserSchema = new Schema({
  salutation: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNo: String,
  password: String,
  locationCoordinates: Array,
  timeStamp: Number
});


// static register method
UserSchema.statics.register = async function(salutation,firstName,lastName,email,phoneNo,password) {

    // validation
    if(!salutation){
      throw Error("Salutation is Required")
    }
    if (!firstName) {
      throw Error('First Name is Required')
    }
    
    if(!email){
        throw Error('Email is required')
      }

    if (!validator.isEmail(email)) {
      throw Error('Invalid email address')
    }
    // if (!validator.isStrongPassword(password)) {
    //   throw Error('Password not strong enough')
    // }
    if(password.length<8)
    {
      throw Error("Password is should be least 8 characters")
    }
    if(phoneNo)
    {
      if(phoneNo.length<10)
      {
        throw Error("Phone no is not valid")
      }
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('User is already Registered, Login Now')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    const user = await this.create({ salutation,firstName,lastName,email,phoneNo,password:hashedPassword})
  
    return user
  }
  
  // static login method
  UserSchema.statics.login = async function(email, password) {
  
    if (!email) {
      throw Error('Email is required')
    }

    if (!password) {
        throw Error('Password is required')
      }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('email not registered')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }


module.exports=mongoose.model('User',UserSchema)