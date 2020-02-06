const Router = require('express').Router() ;
const apiController = require('../controller/api') ;

Router.post('/user' , apiController.makeUser) ;
Router.get('/user' , apiController.getUser) ;

module.exports = Router ;