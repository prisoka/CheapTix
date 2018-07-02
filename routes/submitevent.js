var express = require('express');
var router = express.Router();

/* GET event's submission home page. */
router.get('/', function(req, res, next) {
  res.render('events_form');
});


module.exports = router;
