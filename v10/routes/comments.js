const express = require('express'),
    router = express.Router({ mergeParams: true }),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');
//middleware

// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };
// comments new
router.get('/new', isLoggedIn, (req, res) => {
    // find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});

// comments create
router.post('/', isLoggedIn, (req, res) => {
    // look up campground by ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            // create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log('err');
                } else {
                    // add user name and ID
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment 
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}



module.exports = router;