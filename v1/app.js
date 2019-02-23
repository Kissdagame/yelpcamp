 // imports express
 const express = require("express");

 //set app to use express
 const app = express();

 // import body parser
 const bodyParser = require("body-parser");

 //telling express to use body-parser
 app.use(bodyParser.urlencoded({ extended: true }));

 // allows ejs file to work without needing the file ext
 app.set("view engine", "ejs");

 const campgrounds = [{

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {
         name: "Man Crib",
         image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     },
     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },

     {

         name: "Da Crib",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
     },
     {
         name: "Snow Crib",
         image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
     }
 ];

 // set the rout direction
 app.get("/", (req, res) => {
     res.render("landing");
 });

 app.get("/campgrounds", (req, res) => {

     res.render("campgrounds", { campgrounds: campgrounds });
 });

 app.post("/campgrounds", (req, res) => {

     // get data from form and and add to campground array
     let name = req.body.name;
     let image = req.body.image;
     let newCampground = { name: name, image: image };
     campgrounds.push(newCampground);
     //redirect back to campgrounds page
     res.redirect("/campgrounds");
 });

 app.get("/campgrounds/new", (req, res) => {
     res.render("new");
 });



 //  starts the server 
 app.listen(3000, (req, res) => {
     console.log('YelpCamp has started');
 });