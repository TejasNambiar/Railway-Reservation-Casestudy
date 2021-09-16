const Booking = require('../models/Booking')

// error handling
const handleError =(err) =>{
  console.log(err.message, err.code)
  let errors = {fullName:'',email:'',trainName:'',start:'',destination:'',date:''}

  // validation errors
  if(err.message.includes('passenger validation failed')) 
      Object.values(err.errors).forEach(properties=>{
          // console.log(properties);
          errors[properties.path] = properties.message;
      })
  return errors
}

// add new booking
module.exports.booking_post = async (req,res) =>{
  const { fullName, email, trainName, start, destination, tier, date, adhaar, gender, cvv, pnr} = req.body
  try {
    // async - returns a promise
    const user = await Booking.create({fullName, email, trainName, start, destination, tier, date, adhaar, gender, cvv, pnr})
    console.log(fullName, email, trainName, start, destination, tier, date, adhaar, gender, cvv, pnr )
    res.status(201).json(user)
  } catch (err) {
    //const errors = handleError(err)
    res.status(400).json({err})
  }
}
// rerieve all data
  module.exports.booking_get = (req,res) =>{
    Booking.find((err, contacts) =>{
      res.json(contacts)
  })
  }
// retrieve by id
module.exports.booking_get_id = (req,res) =>{
    Booking.findOne({_id:req.params.id}, (err,result)=>{
      if(err)
          res.json(err)
      else {   
          console.log('retrieved Contact')
          res.json(result)
      }
    })
  }
  
  // retrieve by id
  module.exports.booking_get_pnr = (req,res) =>{
    Booking.findOne([{pnr:req.params.pnr},{adhaar:req.params.adhaar}], (err,result)=>{
      if(err)
          res.json(err)
      else {   
          console.log('retrieved Contact')
          res.json(result)
      }
    })
  }
  // retrieve by id
  module.exports.booking_get_pnr1 = (req,res) =>{
    Booking.findOne({pnr:req.params.pnr}, (err,result)=>{
      if(err)
          res.json(err)
      else {   
          console.log('retrieved Contact')
          res.json(result)
      }
    })
  }

  // deleting by id
  module.exports.booking_delete_id = async (req,res) =>{
    Booking.deleteOne({_id:req.params.id}, (err,result)=>{
      if(err)
          res.json(err)
      else {   
          console.log('deleted Contact')
          res.json(result)
      }
    })
  }
