const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require('dotenv').config()

const PORT = process.env.PORT;
const app = express()

// middlewares
app.use(cors({ origin: "*" }))
app.use(morgan('tiny'))
app.use(express.json())

app.get("/", (req,res)=>{
    res.status(200).json({message:"Server is listening!"})
})

app.listen(PORT, ()=>{
    console.log(`[+] Server is running on ${PORT}`)
})