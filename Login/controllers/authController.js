const Passenger = require('../models/Passenger')

// handle erros
const handleError =(err) =>{
    console.log(err.message, err.code)
    let errors = {name:'',email:'',password:''}

    if(err.code === 11000){
        errors.email = 'that email is already registered'
        return errors
    }   

    // validation errors
    if(err.message.includes('passenger validation failed')) 
        Object.values(err.errors).forEach(properties=>{
            // console.log(properties);
            errors[properties.path] = properties.message;
        })
    return errors
}

module.exports.signup_get = (req,res) =>{
    res.render('signup')
}

module.exports.login_get = (req,res) =>{
    res.render('login')
}

module.exports.signup_post = async (req,res) =>{
  const {name, email, password} = req.body
  try{
    const passenger = await Passenger.create({name, email, password})
    res.status(201).json(passenger)
  }catch(err){
    const errors = handleError(err)
    res.status(400).json({errors})
  }
  
}

module.exports.login_post = async (req,res) =>{
    res.send('new login')
}
