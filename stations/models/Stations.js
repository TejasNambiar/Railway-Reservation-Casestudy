const mongoose = require('mongoose')
const {isEmail} = require('validator');

const stationSchema = new mongoose.Schema({
    stationName:{
        type: String,
        required: [true, 'Please enter a station name']
    },
    stationCode:{
        type: String,
        required: [true, 'Please enter a station code']
    }
})

// fired before doc was saved to database
stationSchema.pre('save',function(next){
    console.log('new booking about to be created', this)
    next()
})

// fired after doc was saved to database
stationSchema.post('save',function(doc,next){
    console.log('new booking was created & saved', doc)
    next()
})

const Station = mongoose.model('station',stationSchema)
module.exports = Station