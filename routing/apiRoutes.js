module.exports = function(app) {

    app.post("/api/submit_stats", function(req, res) {
        //get the stats to submit from the request body
        var stats = req.body;

        //submit the stats to mysql

        //send the submitted data back to front end
        res.json()
    })
}