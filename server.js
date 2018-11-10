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

// Connecting to our database
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

//routes

//route for getting stats from database
app.get("/api/get_stats", function(req, res) {
    connection.query("SELECT * FROM stats", function(err, data) {
        console.log(data);
        res.json(data);
    });
});

//route for submitting new stats to database
app.post("/api/submit_stats", function(req, res) {
    //get the stats to submit from the request body
    var stats = {
        name : req.body.exercise,
        type: req.body.type,
        lastDone: new Date(),
    } 

    //check to make sure exercise has stats already in system, if not enter them
    connection.query(
        "SELECT * FROM stats WHERE name = ?", [stats.name], function(err, data) {
            if (data == 0) {
                console.log("I've found nothing");
                //submit the stats to mysql
                switch(stats.type){
                    case "Cardio":
                        stats.cum = parseFloat(req.body.result1);
                        stats.dis = parseFloat(req.body.result1);
                        stats.pr = parseFloat(req.body.result1);
                        stats.cal = parseInt(req.body.result2);
                        console.log("You've submitted Cardio");
                        console.log(stats);
                        break;
                    case "Muscular":
                        stats.weight = parseInt(req.body.result1);
                        stats.reps = parseInt(req.body.result2);
                        stats.pr = parseInt(req.body.result1);
                        console.log("You've submitted Muscular");
                        break;
                    default:
                        break;
                }
                connection.query(
                    "INSERT INTO stats SET ?", stats, function(err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                           console.log(data);
                        }
                    }
                );
            } else {
                console.log(data);
                //add found data in with new data
                switch(stats.type){
                    case "Cardio":
                        stats.cum = parseFloat(req.body.result1) + data[0].cum;
                        stats.dis = parseFloat(req.body.result1);
                        stats.pr = Math.max(parseFloat(req.body.result1), data[0].pr);
                        stats.cal = parseInt(req.body.result2);
                        console.log("You've submitted Cardio");
                        console.log(stats);
                        break;
                    case "Muscular":
                        stats.weight = parseInt(req.body.result1);
                        stats.reps = parseInt(req.body.result2);
                        stats.pr = Math.max(parseInt(req.body.result1), data[0].pr);
                        console.log("You've submitted Muscular");
                        break;
                    default:
                        break;
                }
                //udate the stats in mysql
                connection.query(
                    "UPDATE stats SET ? WHERE name = ?", [stats, stats.name], function(err, data) {
                        console.log("Stats updated");
                    }
                )
            }
        }
    )

    //send the submitted data back to front end
    res.json(stats)
})