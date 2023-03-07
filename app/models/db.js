const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});


// open the MySQL connection
connection.connect((err)=> {
  if(!err)
  console.log('Database Connection Successfully');
  else
  console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
  });
module.exports = connection;