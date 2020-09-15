var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        // Create a user if one doesn't exist
        var newUser = new User({ username, password })
        newUser
          .save()
          .then(user => {
            console.log("Saved user")
            return done(null, user);
          })
          .catch(err => {
            return done(null, false, { message: "Failed to create user" });
          })
      } else {
        if (!(user.password == password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }
    });
  }
));

module.exports = passport;
