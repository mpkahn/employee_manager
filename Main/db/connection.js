const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees_db"
});

connection.connect();

// Set up promises and allow use of async/await
connection.query = util.promisify(connection.query);

module.exports = connection;
