const mysql = require('mysql');
const util = require('util')

const con = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PWD_DB,
    database: process.env.NAME_DB
});

con.connect(err=>{
    if (err) throw err;
    console.log('Connected');
});

con.query = util.promisify(con.query);

module.exports = con;