const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

const PORT = 3050
const app = express();
// database connection
const dbURI = 'mongodb://localhost/Booking-Auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT,()=>{
      console.log('database and server are up and running on '+PORT)
  }))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(express.json());

// calls the authentication routes
app.use('/api',authRoutes)
