const express = require('express')
const axios = require('axios')
const cors = require("cors")
const app = express()
const helmet =  require('helmet')
const HOST = "localhost"
const PORT = 3099

app.use(express.json());
app.use(cors())
// aadds securityh to api gateway endpoints
app.use(helmet())

app.get('/api/fakeapi',(req,res)=>{
    res.send("Hello from the fake api")
})
app.listen(PORT, ()=>{
    axios({ 
        method: 'POST',
        // Calls the register url
        url: "http://localhost:4000/register1",
        headers: {'Content-Type':'application/json'},
        // body content
        data: {
          apiName: "fakeapi",
          protocol:"http",
          host: HOST,
          port: PORT
      }
      }).then((response)=>{
          console.log(response.data)
      })
    console.log("Fake server has started on the PORT: "+PORT)
})