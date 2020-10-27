//dependencies
const util = require("util");
const mysql = require("mysql");

//connection to mysql server
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BoolZool24!",
    database: "employees"
});

//connect function 
connection.connect();

//setting up connection to use promises//
connection.query = util.promisify(connection.query);

//exporting to reference in other scripts//
module.exports = connection;