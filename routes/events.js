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

// get one event
router.get('/:userid', (req, res, next) => {
  knex('events')
  .where('id', req.params.userid)
  .then((data) => {
    console.log('the specific user', data)
    res.send(data)
  })
})

//create one event
router.post('/', (req, res, next) => {
  knex('events')
  .insert({
    user_id: req.body.users.id,
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

//update one event
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
//
// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   if(validId(id)) {
//     knex('events')
//       .where('id', id)
//       .del()
//       .then(() => {
//         res.redirect('/events');
//       });
//   } else {
//     res.status( 500);
//     res.render('error', {
//       message:  'Invalid id'
//     });
//   }
// });

// router.get('/new', (req, res, next) => {
//   res.render('new');
// });
//
// function validateEventRenderError(req, res, callback) {
//   if(validEvent(req.body)) {
//     const events = {
//       userId: req.body.users.id,
//       event_type: req.body.event_type,
//       event_date: req.body.event_date,
//       event_time: req.body.event_time,
//       event_date: req.body.event_date,
//       available_tickets: req.body.available_tickets,
//       description: req.body.description
//     };
//
//     callback(events);
//   } else {
//     res.status( 500);
//     res.render('error', {
//       message:  'Invalid events'
//     });
//   }
// }
//
// function respondAndRenderTodo(id, res, viewName) {
//   if(validId(id)) {
//     knex('events')
//       .select()
//       .where('id', id)
//       .first()
//       .then(events => {
//         res.render(viewName, events);
//       });
//   } else {
//     res.status( 500);
//     res.render('error', {
//       message:  'Invalid id'
//     });
//   }
// }
//
// function validEvent(events){
//   return typeof events.name === 'string' &&
//   events.type === '' &&
//   typeof events.priority !== 'undefined'
//   //!isNan(Number(events.priority));
// }
//
// function validId(id) {
//   return !isNaN(id);
// }

module.exports = router;
