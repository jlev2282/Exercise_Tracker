//require path so that we have a way to access to proper files to serve
var path = require("path");

//routing 
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    });

    // app.get("*", function(req, res) {
    //     res.sendFile(path.join(__dirname, "/../public/index.html"));
    // })
}