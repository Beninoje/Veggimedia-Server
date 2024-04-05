const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//create express app
const app = express();
app.use(bodyParser.json());

//dotenv production body
if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();

    // cors for angular client access
    const cors = require('cors');
    app.use(cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE,HEAD,OPTIONS"
    }));
}



//DB Connection
mongoose.connect(process.env.MONGO_DB,{})
.then((res)=>{console.log('Connected to MongoDB')})
.catch((err)=>{console.log(`Connection error: ${err}`)})

// controller + route
const mediaController = require('./controllers/media');
app.use('/v1/api/media', mediaController);

//route base URL to angular runtime inside public
app.use(express.static(__dirname + '/public'));
app.get("*",(req,res)=>res.sendFile(__dirname + '/public/index.html'));

app.listen(1000)
module.exports = app;


