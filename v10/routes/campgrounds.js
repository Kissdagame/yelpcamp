const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');


// //middleware
// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };

//index route - shows all  campgrounds
router.get('/', (req, res) => {
    // get all campground from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }

    });
});

//Create - add new campgrounds to DB
router.post('/', isLoggedIn, (req, res) => {

    // get data from form and and add to campground array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };

    let newCampground = { name: name, image: image, description: desc, author: author };

    //Create a new campground and saveto DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });

});

//NEW - show form to create new campground
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

// Show - shows more information about a campground 
router.get('/:id', (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render('campgrounds/show', { campground: foundCampground });
        }
    });
});

// Edit campground route

router.get('/:id/edit', (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', { campground: foundCampground });

        }
    });
});

// update campground route
router.put('/:id', (req, res) => {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            //redirect back to the show page
            res.redirect('/campgrounds/' + req.params.id);
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