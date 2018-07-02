var express = require('express');
var router = express.Router();

// conecting with knex DB
const knex = require('../db/knex')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_business', { title: 'New Event' });

});

//GET ALL events
// router.get('/', (req, res, next) => {
//   // USE KNEX TO GET ALL USERS
//   knex('events')
//   .then((data) => {
//     console.log('data', data)
//     res.status(200).send(data)
//   })
// })



//GET ONE EVENT
// router.get('/:id', function(req, res, next) {
//   res.render('index_business', { title: 'New Event' });
//
// });

//UPDATE ONE EVENT
// router.put('/:id', function(req, res, next) {
//   res.render('index_business', { title: 'New Event' });
//
// });

//DELETE ONE EVENT
// router.delete('/:id', function(req, res, next) {
//   res.render('index_business', { title: 'New Event' });
//
// });


module.exports = router;
