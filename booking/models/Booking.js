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
    tier:{
        type: String,
        required: [true, 'Please enter a tier']
    },
    date:{
        type: String,
        required: [true, 'Please enter a date'],
        default: Date
    },
    adhaar:{
        type: String,
        length:10,
        required: [true, 'Please enter adhaar number']
    },
    gender:{
        type: String,
        required: [true, 'Please enter gender name']
    },
    cvv:{
        type: String,
        required: [true, 'Please enter card cvv']
    },
    pnr:{
        type: String,
        required: [true, 'Did not generate pnr as expected']
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