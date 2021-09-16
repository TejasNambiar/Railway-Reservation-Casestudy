const mongoose = require('mongoose')
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const passengerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter a name'],
        unique:true,
        lowercase: true
    },
    email:{
        type:String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true,
        validate: [isEmail,'Enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
    }

})
// fired before doc was saved to database
passengerSchema.pre('save', async function(next){
    console.log('new signup about to be created', this)
    const salt = await bcrypt.genSalt()
    // hashing password and tghen saving it
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// fired after doc was saved to database
passengerSchema.post('save',function(doc,next){
    console.log('new signup was created & saved', doc)
    next()
})

const Passenger = mongoose.model('passenger',passengerSchema)
module.exports = Passenger