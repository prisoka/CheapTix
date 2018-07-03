var express = require('express');
var router = express.Router();

//require knex:
let knex = require('../db/knex');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// get all users
router.get('/', function(req, res, next) {
  // the client req all
  // the server get all from db
  knex('users')
  .then((data) => {
    // console.log('data', data);
  // response all & if not found, send empty arr
    res.status(200).send(data); // 200 = ok
  })
  .catch((err) => {
    console.log('err', err);
    res.status(500).send({error: {message: 'Something went wrong!'}}) // if can't find the req
  })
});

module.exports = router;
