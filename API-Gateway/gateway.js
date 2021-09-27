const express = require('express')
const routes = require('./routes')
const cors = require("cors")
const app = express()
const helmet =  require('helmet')
const PORT = 4000

app.use(express.json());
app.use(cors())
// aadds securityh to api gateway endpoints
app.use(helmet())
app.use('/',routes)
app.listen(PORT, ()=>{
    console.log("Gateway has started on PORT: "+PORT)
})