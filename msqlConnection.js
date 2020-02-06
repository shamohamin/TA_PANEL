const conf = require('./sqlconf') ;
const mysql = require('mysql');
const con = mysql.createConnection(conf);

module.exports = con ;