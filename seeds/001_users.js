
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_type: 'business', email: 'pete@gmail.com', username: 'pete', password: '1234'},
        {id: 2, user_type: 'customer', email: 'justin@gmail.com', username: 'justin', password: '5678'}
      ]);
    });
};
