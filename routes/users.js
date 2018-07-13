const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcryptjs');


//this router is mounted at http://localhost:3000/users
/* GET home page. */
router.get('/', function(req, res, next) {
  knex('users')
  .then((users) => {
    // obj remove keys: created_at and updated_at
    let newUsersArr = users.map((user) => {
      delete user.created_at;
      delete user.updated_at;
      // console.log('user is', user)
      return user;
    })
    res.status(200).send(newUsersArr); // 200 = ok
  })
  .catch((err) => {
    console.log('err', err);
    res.status(500).send({error: {message: 'Something went wrong!'}}) // if can't find the req
  })
});

// get ONE user
router.get('/:userid', (req, res, next) => {
  knex('users')
  .where('id', req.params.userid)
  .then((user) => {
    let newUserArr = user.map((user) => {
      delete user.created_at;
      delete user.updated_at;
      // console.log('user is', user)
      return user;
    })
    console.log('the specific user', newUserArr)
    res.send(newUserArr)
  })
})


// table.string('user_type').notNullable();
// table.string('email').notNullable();
// table.string('username').notNullable();
// table.text('password').notNullable();

//create one USER
router.post('/', (req, res, next) => {
  // console.log('REQ.BODY', req.body);
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  // check if the email already exists:
  knex('users')
  .where('email', email)
  .first()
  .then((user) => {
    if(user) {
      console.log("email already exists")
      throw new Error('This email already exists!')
    }

    // hash the password
    let hashed = bcrypt.hashSync(password)

    // if it doesn't exist, create new user's record w/ email + hashed password
    knex('users')
    .insert({
      // user_type: req.body.user_type,
      email: email,
      username: username,
      password: hashed,
    })
    .returning('*')
    .then((result) => {
      // console.log("success")
      console.log(result)
      let insertedRecord = result[0]
      console.log('data', insertedRecord)
      res.send(insertedRecord)
    })
  })
  .catch((err) => {
    console.log(err)
    next(err)
  })
})

//update one event <<<OK>>>
router.put('/:userid', (req, res, next) => {
  console.log('THE PUT ROUTE');
  knex('users')
  .where('id', req.params.userid)
  .then((data) => {
    console.log('the specific user', data)

    if(data.length) {
      knex('users')
      .update({
        user_type: req.body.user_type,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
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

  knex('users')
    .where('id', eventId)
    .then((row) => {
      console.log(eventId)
      console.log(row)
      if(!row) return next()
      knex('users')
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
