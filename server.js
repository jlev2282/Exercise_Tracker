var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

//Create an express server
var app = express();

//assign a port conditionally on environment
var PORT = process.env.PORT || 2207;

// Configuring our connection to our database; Also allow for connection to jawsdb if available
if (process.env.JAWSDB_URL) {
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "exercise_tracker"
    });
}

// Connecting to our database, running makeTable which will start the app
connection.connect(function(err) {
  if (err) throw err;
  console.log("connection successful!");
});


// choose a directory from which to serve static content
app.use(express.static("public"));

// employ bodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//bring in the routes for the html and api
// require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//start server 
app.listen(PORT, function() {
    //make log of server start
    console.log("Server up and running on: " + PORT);
});