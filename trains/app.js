const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const axios = require('axios')

const cors = require('cors')
const HOST = "localhost"
const PORT = 3060
const app = express();
app.use(cors())
// database connection
const dbURI = 'mongodb://localhost/Train-Auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT,()=>{
    axios({ 
      method: 'POST',
      // Calls the register url
      url: "http://localhost:4000/register",
      headers: {'Content-Type':'application/json'},
      // body content
      data: {
        apiName: "trains/:id",
        protocol:"http",
        host: HOST,
        port: PORT
    }
    }).then((response)=>{
        console.log(response.data)
    })
      console.log('database and server are up and running on '+PORT)
  }))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(express.json());

// calls the authentication routes
app.use('/api',authRoutes)

// exported for testing purposes
module.exports = app