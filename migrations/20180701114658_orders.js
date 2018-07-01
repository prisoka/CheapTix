// id
// user_id - interger FK
// event_id - integer FK
// number_tickets  integer


exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('users.id');
    table.integer('event_id').notNullable().references('events.id');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders')
}
