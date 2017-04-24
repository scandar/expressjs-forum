var Post = require("../models/post"),
    Comment = require("../models/comment");

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    },
    checkUserPost: function(req, res, next){
        if(req.isAuthenticated()){
            Post.findById(req.params.id, function(err, foundPost){
               if(foundPost.author.id.equals(req.user._id)){
                   next();
               } else {
//                   req.flash("error", "You don't have permission to do that!");
                   console.log("BADD!!!");
                   res.redirect("/index/" + req.params.id);
               }
            });
        } else {
//            req.flash("error", "You need to be signed in to do that!");
            res.redirect("/login");
        }
    },
    checkUserComment: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, comment){
               if(comment.author.id.equals(req.user._id)){
                   next();
               } else {
//                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("/index/" + req.params.id);
               }
            });
        } else {
//            req.flash("error", "You need to be signed in to do that!");
            res.redirect("/login");
        }
    }
}
