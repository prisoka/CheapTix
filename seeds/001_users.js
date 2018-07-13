
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_type: 'business', email: 'pete@gmail.com', username: 'pete', password: '12345678'},
        {id: 2, user_type: 'customer', email: 'justin@gmail.com', username: 'justin', password: '56781234'},
        {id: 3, user_type: 'business', email: 'masha@gmail.com', username: 'masha', password: '1596321aa'},
        {id: 4, user_type: 'customer', email: 'colton@gmail.com', username: 'colton', password: 'colton123'},
        {id: 5, user_type: 'customer', email: 'pri@gmail.com', username: 'priscilla', password: 'priscilla'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    })
};
