const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_type: 'business', email: 'pete@gmail.com', username: 'pete', password: bcrypt.hashSync('12345678')},
        {id: 2, user_type: 'customer', email: 'justin@gmail.com', username: 'justin', password: bcrypt.hashSync('12345678')},
        {id: 3, user_type: 'business', email: 'masha@gmail.com', username: 'masha', password: bcrypt.hashSync('12345678')}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    })
};
