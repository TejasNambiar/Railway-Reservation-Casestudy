const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

const PORT = 3030
const app = express();
// database connection
const dbURI = 'mongodb://localhost/Rail-Auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(PORT,()=>{
      console.log('database and server are up and running on '+PORT)
  }))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/',(req,res)=>res.render('index'))
app.get('/pnrStatus',(req,res)=>res.render('pnrStatus'))
// calls the authentication routes
app.use('/api',authRoutes)
