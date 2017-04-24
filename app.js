var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    Post = require("./models/post"),
    User = require("./models/user"),
    Comment = require("./models/comment");

mongoose.connect(process.env.DATABASEURL);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "in node we trust!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//vars
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//require routes 
var postRoutes = require("./routes/posts"),
    indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments"),
    profileRoutes = require("./routes/profiles");
//ROUTES
app.use("/", indexRoutes);
app.use("/index", postRoutes);
app.use("/index/:id/comments", commentRoutes);
app.use("/profile", profileRoutes);


//LISTEN PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
   console.log("server is running on port" + port);
});