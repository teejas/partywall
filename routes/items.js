var express = require('express');
var router = express.Router();
var Item = require('../models/items')
var mongoose = require('mongoose')

/* GET items listing. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    var res_body = null
    var db_res = mongoose.model('items')
    db_res.find().exec(function(err, items) {
      if(err) {
        return res.status(400).json({ errors: "Error fetching items from db" })
      } else {
        return res.status(200).json({ items: items })
        // return res.status(200).render('items', { items: items });
      }
    })
  } else {
    return res.status(400).json({ errors: "Not logged in" })
  }
});

/* POST to create item */
router.post('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    if(req.query.type) {
      var newItem = null
      if(req.query.type == 'food') {
        if(req.query.name && req.query.description && req.query.weight && req.query.quantity && req.query.price) {
          newItem = new Item(req.query)
        }
      } else if(req.query.type == 'drink') {
        if(req.query.name && req.query.weight && req.query.quantity && req.query.price) {
          newItem = new Item(req.query)
        }
      }
      if(newItem) {
        console.log(newItem)
        newItem.user = req.user.username
        newItem
          .save()
          .then(item => {
            console.log("Saved item")
            return res.status(200).json({ success: 'Created item ' + item })
          })
          .catch(err => {
            console.log(err)
            return res.status(400).json({ errors: err })
          })
      } else {
        return res.status(400).json({ errors: "Failed to create item. Make sure you are providing all necessary parameters." })
      }
    } else {
      return res.status(400).json({ errors: "Failed to create item. Make sure you are providing all necessary parameters." })
    }
  } else {
    return res.status(400).json({ errors: "Not logged in" })
  }
})

/* DELETE item from list */
router.delete('/', function(req, res, next) {
  console.log(req.query)
  if(req.isAuthenticated() && req.query.id) {
    var db_res = mongoose.model('items')
    db_res.deleteOne({ _id: req.query.id }, (err) => {
      if(err) {
        console.log(err)
      } else {
        return res.status(200).json({ success: 'Deleted item with id: ' + req.query.id })
      }
    })

  } else {
    return res.status(400).json({ errors: "Not logged in" })
  }
})

module.exports = router;
