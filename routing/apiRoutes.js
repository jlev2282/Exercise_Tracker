module.exports = function(app) {

    app.post("/api/submit_stats", function(req, res) {
        //get the stats to submit from the request body
        var stats = req.body;

        //check to make sure exercise has stats already in system, if not enter them
        connection.query(
            "SELECT * FROM stats WHERE name = ?", [stats.exercise], function(err, res) {
                if (res == 0) {
                    //submit the stats to mysql
                    connection.query(
                        "INSERT INTO stats SET ?", stats, function(err, data) {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json(data);
                                return;
                            }
                        }
                    );
                } else {
                    //udate the stats in mysql
                    connection.query(
                        "UPDATE stats SET"
                    )
                }
            }
        )

        //send the submitted data back to front end
        res.json(stats)
    })
}