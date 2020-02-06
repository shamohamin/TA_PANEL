const express = require('express');
// const con = require('./msqlConnection') ;
// const mongoose = require('mongoose');
const inserInitial = require('./insertRawInput') ;
const createTable = require('./server/dataShema/SqlTable') ;
const bodyParser = require('body-parser');
const cors = require('cors') ;
const app = express() ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors()) ;

const Router = express.Router() ;
app.use('/' , Router) ;

const apiRouter = require('./server/routes/api.routes') ;

Router.use('/api' , apiRouter) ;

createTable() ;
inserInitial.makeSubmition() ;
inserInitial.makeStudents() ;

// mongoose.connect('mongodb://127.0.0.1:27017/ta',{
    // useNewUrlParser:true ,
    // useUnifiedTopology: true
// })

// const connection = mongoose.connection ;

// connection.once('open',function(){
    // console.log('connected successfully to database');
// })

app.listen('3600',function(){
    console.log("connection established in server")
});