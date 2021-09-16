const Stations = require('../models/Stations')

// error handling
const handleError =(err) =>{
  console.log(err.message, err.code)
  let errors = {stationName:'',stationCode:''}

  // validation errors
  if(err.message.includes('train validation failed')) 
      Object.values(err.errors).forEach(properties=>{
          // console.log(properties);
          errors[properties.path] = properties.message;
      })
  return errors
}

// add new booking
module.exports.station_post = async (req,res) =>{
  const { stationName, stationCode} = req.body
  try {
    // async - returns a promise
    const station = await Stations.create({ stationName, stationCode})
    console.log(stationName, stationCode)
    res.status(201).json(station)
  } catch (err) {
    const errors = handleError(err)
    res.status(400).json({errors})
  }
}
// rerieve all data
  module.exports.station_get = (req,res) =>{
    Stations.find((err, contacts) =>{
      res.json(contacts)
  })
  }

  // deleting by id
  module.exports.station_delete_id = async (req,res) =>{
    Stations.deleteOne({_id:req.params.id}, (err,result)=>{
      if(err)
          res.json(err)
      else {   
          console.log('deleted Contact')
          res.json(result)
      }
    })
  }
