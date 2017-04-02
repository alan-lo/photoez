const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const passport = require('passport');
const authenticate = require('./config/authenticate')(passport);

const flash    = require('connect-flash');
const session  = require('express-session');

//routes
const index = require('./routes/index');
const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
const posts = require('./routes/posts');
const albums = require('./routes/albums');
const signUp = require('./routes/signup');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//require('./routes/sigup.js')(passport); // load our routes and pass in our app and fully configured passport

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'ilovesphotoezphotoez',
                  saveUninitialized: true,
                  resave: true
}));


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



//connect flash
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success   = req.flash('success').join(', ');
  res.locals.error     = req.flash('error').join(', ');
  res.locals.info      = req.flash('info').join(', ');
  next();
});

//password init
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Middleware to check if the current user is login
app.use(function(req,res,next){
  if(req.user){
    res.locals.user = req.user.username
  }
  next()
})

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});


app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true,
  debug: true
}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.use('/', index);
app.use('/users', users(passport));
app.use('/dashboard', loggedIn, dashboard);
app.use('/albums', albums);
app.use('/posts', posts);

// app.use('/sign-up', signUp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
