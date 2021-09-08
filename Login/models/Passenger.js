const mongoose = require('mongoose')
const {isEmail} = require('validator');

const passengerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter a name'],
        unique: true,
        lowercase: true
    },
    email:{
        type:String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})
const Passenger = mongoose.model('passenger',passengerSchema)
module.exports = Passenger