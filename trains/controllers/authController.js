const Trains = require('../models/Trains')

// error handling
const handleError =(err) =>{
  console.log(err.message, err.code)
  let errors = {fullName:'',email:'',trainName:'',start:'',destination:'',date:'', arrivalTime:'', departureTime:''}

  // validation errors
  if(err.message.includes('train validation failed')) 
      Object.values(err.errors).forEach(properties=>{
          // console.log(properties);
          errors[properties.path] = properties.message;
      })
  return errors
}

// add new train
module.exports.train_post = async (req,res) =>{
  const { trainName, trainNumber, startStation, destination, arrivalTime, departureTime, date} = req.body
  try {
    // async - returns a promise
    const user = await Trains.create({ trainName, trainNumber, startStation, destination, arrivalTime, departureTime, date})
    console.log(trainName, trainNumber, startStation, destination, arrivalTime, departureTime, date)
    res.status(200).json(user)
  } catch (err) {
    const errors = handleError(err)
    res.status(404).json({errors})
  }
}
// rerieve all data
  module.exports.train_get = (req,res) =>{
    try{
      Trains.find((err, contacts) =>{
        res.status(200).json(contacts)})
    }catch(err){
      const errors = handleError(err)
    res.status(404).json({errors})
    }      
  }
// retrieve by id
module.exports.train_get_id = (req,res) =>{
    Trains.findOne({_id:req.params.id}, (err,result)=>{
      if(err)
          res.status(404).json(err)
      else {   
          console.log('retrieved Contact')
          res.status(200).json(result)
      }
    })
  }
  
  // deleting by id
  module.exports.train_delete_id = async (req,res) =>{
    Trains.deleteOne({_id:req.params.id}, (err,result)=>{
      if(err)
          res.json(err)
      else {   
          console.log('deleted Contact')
          res.json(result)
      }
    })
  }

  // searching to and from stations
  module.exports.train_get_search = (req, res) =>{
    Trains.find({ startStation: req.params.to, destination: req.params.from }, (err, result)=>{
          if(err)
            res.json(err)
          else{
            console.log('found trains')
            trains = result
            console.log("trains found "+ trains)
            res.json(result)
          }
    })
  }
