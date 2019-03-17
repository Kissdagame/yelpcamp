 // imports express
 const express = require('express'),
     // set app to use express
     app = express(),
     // import body parser
     bodyParser = require('body-parser'),
     // imports mongoose
     mongoose = require('mongoose'),
     // connects the campground sheet
     Campground = require('./models/campground'),
     // connects the seeds sheet
     seedDB = require('./seeds'),
     // imports the comments 
     Comment = require('./models/comment'),
     // allows us to use the passportjs
     passport = require('passport'),
     // allows us to use the passport local
     LocalStrategy = require('passport-local'),
     //imports user model to app
     User = require('./models/user'),
     //port sever is running on
     port = 3000;

 // requiring routes

 const commentRoutes = require('./routes/comments'),
     campgroundRoutes = require('./routes/campgrounds'),
     indexRoutes = require('./routes/index');

 // Connects the seed sheet
 seedDB();

 //telling express to use body-parser
 app.use(bodyParser.urlencoded({ extended: true }));

 // Passport configuration
 app.use(require('express-session')({
     secret: 'No one will know',
     resave: false,
     saveUninitialized: false
 }));

 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

 //connects to mongodb
 mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

 app.use((req, res, next) => {
     res.locals.currentUser = req.user;
     next();
 });

 // allows ejs file to work without needing the file ext
 app.set('view engine', 'ejs');

 // connects the stylesheet
 app.use(express.static(__dirname + '/public'));
 console.log(__dirname);

 app.use(indexRoutes);
 app.use('/campgrounds', campgroundRoutes);
 app.use('/campgrounds/:id/comments', commentRoutes);

 //  starts the server 
 app.listen(port, (req, res) => {
     console.log('YelpCamp server has started');
 });