var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Priscilla' });
  res.render('events_form');
});


module.exports = router;
