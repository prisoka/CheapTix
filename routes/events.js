var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

//this router is mounted at http://localhost:3000/events
/* GET home page. */
router.get('/', function(req, res, next) {
  knex('events')
  .then((data) => {
    res.status(200).send(data); // 200 = ok
  })
  .catch((err) => {
    console.log('err', err);
    res.status(500).send({error: {message: 'Something went wrong!'}}) // if can't find the req
  })
});

// get ONE event
router.get('/:userid', (req, res, next) => {
  knex('events')
  .where('id', req.params.userid)
  .then((data) => {
    console.log('the specific user', data)
    res.send(data)
  })
})

//create one event <<<NOK>>>
router.post('/', (req, res, next) => {
  knex('events')
  .insert({
    user_id: req.body.user_id,
    event_type: req.body.event_type,
    event_name: req.body.event_date,
    // event_time: req.body.event_time,
    // event_date: req.body.event_date,
    available_tickets: req.body.available_tickets,
    description: req.body.description
  })
  .returning('*')
  .then((result) => {
    let insertedRecord = result[0]
    console.log('data', insertedRecord)
    res.send(insertedRecord)
  })
})

//update one event <<<NOK>>>
router.put('/:userid', (req, res, next) => {
  console.log('THE PUT ROUTE');
  knex('events')
  .where('id', req.params.userid)
  .then((data) => {
    console.log('the specific user', data)

    if(data.length) {
      knex('events')
      .update({
        name: req.body.name
      })
      .where('id', req.params.userid)
      .returning('*')
      .then((updateResult) => {
        console.log('updateResult', updateResult)
        res.send(updateResult[0])
      })
    }
  })
})

// DELETE a specific event <<<NOK>>>
router.delete('/:userid', (req, res, next) => {
  // lookup a userid in the DB, if exists, delete it
  knex('events')
  .where('id', req.params.userid)
  .del()
  .then((result) => {
    console.log('result', result)
    if( result ) {
      res.send({ 'success': result })
    } else {
      throw new Error('Couldnt find the event to delete')
    }
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;
