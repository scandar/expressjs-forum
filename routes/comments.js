var express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Post = require("../models/post"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

//new comment route 
router.post("/", middleware.isLoggedIn, function (req, res) {
    Post.findById(req.params.id, function (err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    foundPost.comments.push(comment);
                    foundPost.save();
                    res.redirect("/index/" + foundPost._id);
                }
            });
        }
    });
});

//comment edit form 
router.get("/:comment_id/edit", middleware.checkUserComment, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", {
                comment: comment,
                post_id: req.params.id
            });
        }
    });
});

//update route
router.put("/:comment_id", middleware.checkUserComment, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, editedComment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/index/" + req.params.id);
        }
    });
});

//destroy route 
router.delete("/:comment_id", middleware.checkUserComment, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/index/" + req.params.id);
        }
    });
});
module.exports = router;
