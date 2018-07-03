exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('events').insert([
        {
          id: 1,
          user_id: 1,
          event_type: 'Party',
          event_name: 'Summer Solstice Party',
          event_date: '2018/07/01',
          event_time: '01:30',
          available_tickets: 15,
          description: 'test'
        }, {
          id: 2,
          user_id: 2,
          event_type: 'Movie',
          event_name: 'Avangers III',
          event_date: '2018/07/01',
          event_time: '01:30',
          available_tickets: 5,
          description: 'test'
        }, {
          id: 3,
          user_id: 1,
          event_type: 'Exhibition',
          event_name: 'Picasso',
          event_date: '2018/07/01',
          event_time: '06:30',
          available_tickets: 10,
          description: 'test'
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));"
      )
    })
}
