var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    Post = require("./models/post"),
    User = require("./models/user"),
    Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/demo");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//require routes 
var postRoutes = require("./routes/posts"),
    indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments");
//ROUTES
app.use(indexRoutes);
app.use("/index", postRoutes);
app.use("/index/:id/comments", commentRoutes);


//LISTEN PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
   console.log("server is running on port" + port);
});