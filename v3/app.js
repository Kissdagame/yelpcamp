 // imports express
 const express = require("express"),
     //set app to use express
     app = express(),
     // import body parser
     bodyParser = require("body-parser"),
     //imports mongoose
     mongoose = require("mongoose"),
     // connects the campground sheet
     Campground = require("./models/campground"),
     //connects the seeds sheet
     seedDB = require("./seeds");


 seedDB();

 //connects to mongodb

 mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

 //telling express to use body-parser
 app.use(bodyParser.urlencoded({ extended: true }));

 // allows ejs file to work without needing the file ext
 app.set("view engine", "ejs");


 // set the rout direction
 app.get("/", (req, res) => {
     res.render("landing");
 });


 //index route - shows all  campgrounds
 app.get("/campgrounds", (req, res) => {
     // get all campground from DB
     Campground.find({}, (err, allCampgrounds) => {
         if (err) {
             console.log(err);
         } else {
             res.render("index", { campgrounds: allCampgrounds });
         }

     });
 });

 //Create - add new campgrounds to DB
 app.post("/campgrounds", (req, res) => {

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
             res.redirect("/campgrounds");
         }
     });

 });


 //NEW - show form to create new campground
 app.get("/campgrounds/new", (req, res) => {
     res.render("new");
 });

 // Show - shows more information about a campground 
 app.get("/campgrounds/:id", (req, res) => {
     // find the campground with provided ID
     Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
         if (err) {
             console.log(err);
         } else {
             //render show template with that campground
             res.render("show", { campground: foundCampground });
         }
     });
 });

 //  starts the server 
 app.listen(3000, (req, res) => {
     console.log("YelpCamp server has started");
 });