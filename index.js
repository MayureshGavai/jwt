const express = require('express')
const mongoose = require('mongoose')
const router = require('./src/routes/auth.route')
const verifyToken = require('./middleware')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB connected!')
    
    app.use(express.json())
    app.use('/auth',router)
    app.use(cookieParser())

    app.get('/',(req,res)=>{
        res.send("home")
    })

    app.get('/set',(req,res)=>{
        res.cookie('name','mayuresh')
        res.send("set")
    })

    app.get('/get',(req,res)=>{
        res.status(200).send(req.cookies)
    })

    app.get('/decodeDetails', verifyToken, (req,res)=>{
        const {username, password} = req.user
        res.json({username : username, password:  password})
    })
    
    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})

