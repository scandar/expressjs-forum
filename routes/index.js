var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//landing page
router.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/index");
    } else {
        res.render("landing");
    }
});

//register page
router.get("/register", function (req, res) {
    res.render("register");
});

//register route
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/index");
        });
    });
});

//login page 
router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
}));

//logout
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
module.exports = router;
