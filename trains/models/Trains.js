const mongoose = require('mongoose')
const {isEmail} = require('validator');

const trainSchema = new mongoose.Schema({
    trainName:{
        type: String,
        required: [true, 'Please enter a train name']
    },
    trainNumber:{
        type: Number,
        required: [true, 'Please enter a date']
    },
    startStation:{
        type: String,
        required: [true, 'Please enter an start Junction/Location']
    },
    destination:{
        type: String,
        required: [true, 'Please enter your destination']
    },
    arrivalTime:{
        type: String,
        required: [true, 'Please enter your destination']
    },
    departureTime:{
        type: String,
        required: [true, 'Please enter your destination']
    },
    date:{
        type: Date,
        required: [true, 'Please enter a date']
    }
})

// fired before doc was saved to database
trainSchema.pre('save',function(next){
    console.log('new booking about to be created', this)
    next()
})

// fired after doc was saved to database
trainSchema.post('save',function(doc,next){
    console.log('new booking was created & saved', doc)
    next()
})

const Trains = mongoose.model('train',trainSchema)
module.exports = Trains