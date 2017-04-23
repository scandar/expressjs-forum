var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");


//show route
router.get("/", function(req, res) {
    //find all posts and render index
    Post.find({}, function(err, posts) {
        if(err) {
            console.log(err);
        } else {
           res.render("index", {posts: posts});
        }
    });
});

//new post form
router.get("/new", function(req, res) {
   res.render("new"); 
});

//new post route
router.post("/", function(req, res) {
    Post.create(req.body.post, function(err, newPost) {
       if(err) {
           cosnole.log(err);
       } else {
           res.redirect("/index");
       }
    });
});

//post show route
router.get("/:id", function(req, res) {
   Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
      if(err) {
          console.log(err);
      } else {
          res.render("show", {post: foundPost});
      }
   });
});

//post edit form 
router.get("/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if(err) {
            console.log(err);
        } else {
           res.render("edit", {post: foundPost}); 
        }
    })
});
//edit post route
router.put("/:id", function(req, res) {
   Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, foundPost) {
       if(err) {
           console.log(err);
       } else {
           res.redirect("/index/" + foundPost._id);
       }
   }) 
});

//destroy route
router.delete("/:id", function(req, res) {
   Post.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           console.log(err);
       } else {
           res.redirect("/index");
       }
   }) 
});

module.exports = router;