var express = require('express');
var router = express.Router();

const knex = require('../db/knex');


//this router is mounted at http://localhost:3000/events
/* GET home page. */
router.get('/', function(req, res, next) {
  knex('events')
  .then((events) => {
    let newEventsArr = events.map((event) => {
      delete event.created_at;
      delete event.updated_at;
      delete event.address1;
      delete event.address2;
      delete event.state;
      delete event.city;
      delete event.zip;
      delete event.event_date;
      delete event.event_time;

      // console.log('event is', event)
      return event;
    })
    res.status(200).send(newEventsArr); // 200 = ok
  })
  .catch((err) => {
    console.log('err', err);
    res.status(500).send({error: {message: 'Something went wrong!'}}) // if can't find the req
  })
});

// get ONE event
router.get('/:eventId', (req, res, next) => {
  knex('events')
  .where('id', req.params.eventId)
  .then((events) => {
    let event = events[0]
    delete event.created_at;
    delete event.updated_at;
    delete event.address1;
    delete event.address2;
    delete event.state;
    delete event.city;
    delete event.zip;
    delete event.event_date;
    delete event.event_time;

    console.log('the specific event', event)
    res.send(event)
  })
})


// table.integer('user_id').references('users.id');
// table.text('event_type').notNullable();
// table.text('event_name').notNullable();
// table.date('event_date').notNullable();
// table.time('event_time').notNullable();
// table.integer('available_tickets').notNullable();
// table.text('description').notNullable();


//create one event <<<OK>>>
router.post('/', (req, res, next) => {
  console.log('REQ.BODY', req.body);
  knex('events')
  .insert({
    user_id: req.body.user_id,
    event_type: req.body.event_type,
    event_name: req.body.event_name,
    event_time: req.body.event_time,
    event_date: req.body.event_date,
    available_tickets: req.body.available_tickets,
    description: req.body.description,
    state: req.body.state,
    city: req.body.city,
    address1: req.body.address1,
    address2: req.body.address2,
    zip: req.body.zip
  })
  .returning('*')
  .then((result) => {
    console.log(result)
    let insertedRecord = result[0]
    console.log('data', insertedRecord)
    res.send(insertedRecord)
  })
})

// table.integer('user_id').references('users.id');
// table.text('event_type').notNullable();
// table.text('event_name').notNullable();
// table.date('event_date').notNullable();
// table.time('event_time').notNullable();
// table.integer('available_tickets').notNullable();
// table.text('description').notNullable();

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
        user_id: req.body.user_id,
        event_type: req.body.event_type,
        event_name: req.body.event_name,
        event_time: req.body.event_time,
        event_date: req.body.event_date,
        available_tickets: req.body.available_tickets,
        description: req.body.description,
        state: req.body.state,
        city: req.body.city,
        address1: req.body.address1,
        address2: req.body.address2,
        zip: req.body.zip
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

// DELETE a specific event <<<OK>>>
router.delete('/:id', function(req, res, next) {
  const eventId = req.params.id;

  knex('events')
    .where('id', eventId)
    //.first()
    .then((row) => {
      console.log(eventId)
      console.log(row)
      if(!row) return next()
      knex('events')
        .del()
        .where('id', eventId)
        .then(() => {
          res.send(`ID ${eventId} Deleted`)
        })
        .catch((err) => {
          console.log("Hey, could not delete!")
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
