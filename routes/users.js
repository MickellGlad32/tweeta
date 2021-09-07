var express = require('express');
var router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.post('/register', function(req, res, next) {
// take the username, password
if(!req.body.username || !req.body.password){
  res.status(400).json({
    error: 'please include username and password'
  })
}
// create a new user
// check if the username is already taken
db.User.findOne({
  where: {
    username: req.body.username
  }
})
.then(() => {
  if (user){
    res.status(400).jsonp({
      error: 'username already in use'
    })
    return 
  }
})
// hash password
bcrypt.hash(req.body.password, 10)
.then((hash) => {
  //  store in database
  db.User.create({
    username: req.body.username,
    password: hash
  })
  .then((user) => {
    res.status(201).json({
      success: 'User created'
    })
  })
})

// respond with success/error
});

module.exports = router;
