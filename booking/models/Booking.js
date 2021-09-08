const mongoose = require('mongoose')
const {isEmail} = require('validator');

const bookingSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: [true, 'Please enter a name'],
        unique:true,
        lowercase: true
    },
    email:{
        type:String,
        required: [true, 'Please enter an email'],
        validate:[isEmail,"Please enter a valid email"],
        lowercase: true
    },
    trainName:{
        type: String,
        required: [true, 'Please enter a train name']
    },
    start:{
        type: String,
        required: [true, 'Please enter an start location']
    },
    destination:{
        type: String,
        required: [true, 'Please enter your destination']
    },
    date:{
        type: String,
        required: [true, 'Please enter a date']
    }
})

// fired before doc was saved to database
bookingSchema.pre('save',function(next){
    console.log('new booking about to be created', this)
    next()
})

// fired after doc was saved to database
bookingSchema.post('save',function(doc,next){
    console.log('new booking was created & saved', doc)
    next()
})

const Booking = mongoose.model('passenger',bookingSchema)
module.exports = Booking