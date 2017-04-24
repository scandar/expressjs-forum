var express = require("express"),
    router = express.Router(),
    Post = require("../models/post"),
    User = require("../models/user"),
    middleware = require("../middleware");

router.get("/:userId", function(req, res) {
    User.findById(req.params.userId).populate("posts").exec(function(err, user) {
        if(err) {
            console.log(err);
            res.redirect("/index");
        } else {
            res.render("profiles/profile", {user: user});
        }
    });
});

module.exports = router;