// id
// user_id - integer FK
// event_name - string (NN)
// event_type - text (NN)
// event_name - string (NN)
// event_date -  (NN)
// event_time -  (NN)
// available_tickets - integer (NN)
// order_id - integer FK
// description - text
//state - string
//city/town -string
//address line1 -text
//address line2 -text
//zip/postalcode -integer


exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments().primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE').index();
    table.text('event_type');
    table.text('event_name');
    table.date('event_date');
    table.time('event_time');
    table.integer('available_tickets');
    table.text('description');
    table.string('state');
    table.string('city');
    table.text('address1');
    table.text('address2');
    table.integer('zip');

    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
}
