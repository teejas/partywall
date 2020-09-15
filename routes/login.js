var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET to fetch login form */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* POST to authenticate user */
router.post('/', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      console.log("error authenticating")
      return res.status(400).json({ errors: err })
    }
    if(!user) {
      return res.status(400).json({ errors: "We found a user by that name, but the password did not match." });
    }
    req.logIn(user, function(err) {
      if(err) {
        console.log("error logging in")
        console.log(err)
        return res.status(400).json({ errors: err })
      }
      // res.redirect('/items');
      return res.status(200).json({ success: 'Logged in ' + user.username })
    })
  })(req, res, next);
});

module.exports = router;
