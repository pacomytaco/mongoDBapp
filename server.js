//require dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");


//set up port
var PORT = process.env.PORT || 3000;

// instatiate express app
var app = express();

//set up express router 
var router = express.Router();

//require routes file + pass router object
require("./config/routes")(router);

//set public folder as static directory
app.use(express.static(__dirname + "/public"));

//use bP in app
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//have every request run through router middleware
app.use(router);

//use deployed db if deployed, if not use local mongoHeadlines db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to db
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

//listen on port
app.listen(PORT, function() { 
    console.log("listening on port:" + PORT);
});