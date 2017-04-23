var express = require("express"),
    router = express.Router({mergeParams: true}),
    Post = require("../models/post"),
    Comment = require("../models/comment");

//new comment route 
router.post("/", function(req, res) {
   Post.findById(req.params.id, function(err, foundPost) {
      if(err) {
          console.log(err);
      } else {
          Comment.create(req.body.comment, function(err, comment) {
              if(err) {
                  console.log(err);
              } else {
                  comment.save();
                  foundPost.comments.push(comment);
                  foundPost.save();
                  res.redirect("/index/" + foundPost._id);
              }
          });
      }
   });
});

//commet edit form 
router.get("/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
       if(err) {
           console.log(err);
       } else {
           res.render("comments/edit", {comment: comment, post_id: req.params.id});
       }
    });
});

//update route
router.put("/:comment_id", function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, editedComment) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/index/" + req.params.id);
        }
    });
});

//destroy route 
router.delete("/:comment_id", function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           console.log(err);
       } else {
           res.redirect("/index/" + req.params.id);
       }
   });
});
module.exports = router;