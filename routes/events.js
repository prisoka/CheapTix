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

// router.get('/new', (req, res, next) => {
//   res.render('new');
// });

// router.get('/:id', (req, res) => {
//   const id = req.params.id;
//   respondAndRenderTodo(id, res, 'single');
// });
//
//
// router.get('/:id/edit', (req, res) => {
//   const id = req.params.id;
//   respondAndRenderTodo(id, res, 'edit');
// })
//
// router.post('/', (req, res) => {
//   validateTodoRenderError(req, res, (events) => {
//     events.date = new Date();
//     knex('events')
//       .insert(events, 'id')
//       .then(ids => {
//         const id = ids[0];
//         res.redirect(`/events/${id}`);
//       });
//   });
// });
//
// router.put('/:id', (req, res) => {
//   validateTodoRenderError(req, res, (events) => {
//     const id = req.params.id;
//     knex('events')
//       .where('id', id)
//       .update(events, 'id')
//       .then(() => {
//         res.redirect(`/events/${id}`);
//       });
//   });
// });
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
//
// function validateTodoRenderError(req, res, callback) {
//   if(validTodo(req.body)) {
//     const events = {
//       title: req.body.title,
//       description: req.body.description,
//       priority: req.body.priority
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
// function validTodo(events){
//   return typeof events.title === 'string' &&
//   events.title.trim() !== '' &&
//   typeof events.priority !== 'undefined'
//   //!isNan(Number(events.priority));
// }
//
// function validId(id) {
//   return !isNaN(id);
// }

module.exports = router;
