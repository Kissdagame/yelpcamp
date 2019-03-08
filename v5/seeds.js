const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

let data = [{
        name: "Clouds Rest",
        image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg",
        description: "A nice place to visit"
    },
    {
        name: "Crows Nest",
        image: "https://farm6.staticflickr.com/5080/7004537596_a29365d72f.jpg",
        description: "Relax and enjoy"
    },
    {
        name: "Jacks Peak",
        image: "https://farm8.staticflickr.com/7393/14137069393_d2f0ab9187.jpg",
        description: "All games"
    }
];

function seedDB() {
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds");
            // add in a few campground
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // add comments
                        Comment.create({
                            text: "This place is great but I wish there was internet",
                            author: "Homer"
                        }, ((err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }));
                    }
                });
            });

        }
    });
}




//function using e6 come back and fix later
// ((seedDB) => {
//     Campground.remove({}, (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Removed campgrounds");
//         }
//     });
// });

module.exports = seedDB;