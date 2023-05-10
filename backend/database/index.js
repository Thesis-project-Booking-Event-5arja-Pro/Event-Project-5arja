const mysql = require('mysql2');
const config = {
    host: 'localhost',
    user: 'root',
    password: '09932114', 
    database: 'ed'
  };

const connection = mysql.createConnection(config)
connection.connect((err)=>{
    if (err) {
        console.log(err)
    }
    else {
        console.log("db MYSQL connected")
    }
})



module.exports=connection