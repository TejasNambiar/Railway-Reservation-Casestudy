const express = require('express')
const stripe = require('stripe')('verySecretKey')
const app = express()
const PORT = 8000

// middleware
app.use(express.json())

app.post("/payment", async(req,res)=>{
    const {product}=req.body
    const session =
})

// listening to port
app.listen(PORT,()=>{
    console.log('server are up and running on '+PORT)
})
