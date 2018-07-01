
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, user_id: 1, event_type: 'Party', event_name: 'Summer Solstice Party', event_date: '2018/07/01', event_time: '01:30', available_tickets: 15, description: 'test'}
      ]);
    });
};
