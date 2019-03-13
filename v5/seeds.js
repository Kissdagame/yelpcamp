const mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

let data = [{
        name: 'Clouds Rest',
        image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra nec quam sit amet varius. Aenean a posuere tortor. Pellentesque sed magna eros. Nunc pulvinar fringilla pharetra. Integer condimentum turpis et laoreet finibus. Phasellus iaculis leo sapien, sed fringilla mi imperdiet sit amet. Phasellus sodales lobortis urna, et rhoncus nisi feugiat sit amet. Nullam libero est, imperdiet eu congue nec, rutrum et enim. Morbi ut nisi viverra, semper neque vel, commodo dolor. Fusce sodales dolor non egestas hendrerit. Mauris semper magna ac dictum molestie. Cras eget eros nulla.'

    },
    {
        name: 'Crows Nest',
        image: 'https://farm6.staticflickr.com/5080/7004537596_a29365d72f.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra nec quam sit amet varius. Aenean a posuere tortor. Pellentesque sed magna eros. Nunc pulvinar fringilla pharetra. Integer condimentum turpis et laoreet finibus. Phasellus iaculis leo sapien, sed fringilla mi imperdiet sit amet. Phasellus sodales lobortis urna, et rhoncus nisi feugiat sit amet. Nullam libero est, imperdiet eu congue nec, rutrum et enim. Morbi ut nisi viverra, semper neque vel, commodo dolor. Fusce sodales dolor non egestas hendrerit. Mauris semper magna ac dictum molestie. Cras eget eros nulla.'

    },
    {
        name: 'Jacks Peak',
        image: 'https://farm8.staticflickr.com/7393/14137069393_d2f0ab9187.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra nec quam sit amet varius. Aenean a posuere tortor. Pellentesque sed magna eros. Nunc pulvinar fringilla pharetra. Integer condimentum turpis et laoreet finibus. Phasellus iaculis leo sapien, sed fringilla mi imperdiet sit amet. Phasellus sodales lobortis urna, et rhoncus nisi feugiat sit amet. Nullam libero est, imperdiet eu congue nec, rutrum et enim. Morbi ut nisi viverra, semper neque vel, commodo dolor. Fusce sodales dolor non egestas hendrerit. Mauris semper magna ac dictum molestie. Cras eget eros nulla.'


    }
];

function seedDB() {
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Removed campgrounds');
            // add in a few campground
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('added a campground');
                        // add comments
                        Comment.create({
                            text: 'This place is great but I wish there was internet',
                            author: 'Homer'
                        }, ((err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('Created new comment');
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
//             console.log('Removed campgrounds');
//         }
//     });
// });

module.exports = seedDB;