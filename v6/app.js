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
 // Connects the seed sheet
 seedDB();

 //middleware

 const isLoggedIn = (req, res, next) => {
     if (req.isAuthenticated()) {
         return next();
     }
     res.redirect('/login');
 };

 //telling express to use body-parser
 app.use(bodyParser.urlencoded({ extended: true }));

 // Passport c(onfiguration
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

 // set the rout direction
 app.get('/', (req, res) => {
     res.render('landing');
 });


 //index route - shows all  campgrounds
 app.get('/campgrounds', (req, res) => {
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
 app.post('/campgrounds', (req, res) => {

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
 app.get('/campgrounds/new', (req, res) => {
     res.render('campgrounds/new');
 });

 // Show - shows more information about a campground 
 app.get('/campgrounds/:id', (req, res) => {
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

 //======================
 // Comment Routes
 //======================

 app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
     // find campground by id
     Campground.findById(req.params.id, (err, campground) => {
         if (err) {
             console.log(err);
         } else {
             res.render('comments/new', { campground: campground });
         }
     });
 });

 app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
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
                     campground.comments.push(comment);
                     campground.save();
                     res.redirect('/campgrounds/' + campground._id);
                 }
             });
             // connect new comment to campground
             // redirect campground show page

         }
     });
 });

 // auth routes

 // register route

 app.get('/register', (req, res) => {
     res.render('register');
 });

 // handles the sign up logic

 app.post('/register', (req, res) => {
     let newUser = new User({ username: req.body.username });
     User.register(newUser, req.body.password, (err, user) => {
         if (err) {
             console.log(err);
             return res.render('register');
         }
         passport.authenticate('local')(req, res, () => {
             res.redirect('/campgrounds');
         });
     });
 });


 // show login form

 app.get('/login', (req, res) => {
     res.render('login');
 });

 // handles the login logic
 app.post('/login', passport.authenticate('local', {
     successRedirect: '/campgrounds',
     failureRedirect: '/login'
 }), (req, res) => {

 });


 // logout route

 app.get('/logout', (req, res) => {
     req.logout();
     res.redirect('/');
 });



 //  starts the server 
 app.listen(port, (req, res) => {
     console.log('YelpCamp server has started');
 });