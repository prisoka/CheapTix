// id
// user_id - integer FK
// event_type - text (NN)
// event_name - string (NN)
// event_date -  (NN)
// event_time -  (NN)
// available_tickets - integer (NN)
// order_id - integer FK
// description - text

exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments().primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE').index();
    table.text('event_type').notNullable();
    table.text('event_name').notNullable();
    table.date('event_date');
    table.time('event_time');
    table.integer('available_tickets').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
}
