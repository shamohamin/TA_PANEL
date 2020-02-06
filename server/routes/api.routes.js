const Router = require('express').Router() ;
const apiController = require('../controller/api') ;
const sqlController = require('../controller/sqlapi') ;

Router.post('/user' , sqlController.MakeUser) ;
Router.get('/user' , sqlController.getSubmmitionScore) ;

module.exports = Router ;