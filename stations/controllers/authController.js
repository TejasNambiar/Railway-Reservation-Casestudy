const Stations = require('../models/Stations')

// error handling
const handleError =(err) =>{
  console.log(err.message, err.code)
  let errors = {stationName:'',stationCode:''}

  if (err.message === 'station validation failed: stationCode: Please enter a station code'){
    errors.stationCode = 'Station Code not entered';
}

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
    res.status(200).json(station)
  } catch (err) {
    const errors = handleError(err)
    res.status(404).json({errors})
  }
}
// rerieve all data
  module.exports.station_get = (req,res) =>{
    Stations.find((err, contacts) =>{
      res.status(200).json(contacts)
    })
  }

  // rerieve all data
  module.exports.station_get_id = (req,res) =>{
    Stations.find({_id:req.params.id},(err, contacts) =>{
      if(contacts)
          res.status(200).json(contacts)
      else {   
        const errors = handleError(err)
        res.status(404).json({errors})
      }
    })
  }

  // deleting by id
  module.exports.station_delete_id = async (req,res) =>{
    Stations.deleteOne({_id:req.params.id}, (err,result)=>{
      if(err)
          res.status(404).json(err)
      else {   
          console.log('deleted Contact')
          res.json(result)
      }
    })
  }
