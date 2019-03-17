const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

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
router.post('/', (req, res) => {

    // get data from form and and add to campground array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = { name: name, image: image, description: desc };

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
router.get('/new', (req, res) => {
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


module.exports = router;