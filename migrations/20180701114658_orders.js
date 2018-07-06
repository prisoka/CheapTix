// id
// user_id - interger FK (put notNullable() back - future)
// event_id - integer FK (put notNullable() back - future)
// number_tickets  integer


exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments().primary();
    table.integer('user_id').references('users.id');
    table.integer('event_id').references('events.id');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders')
}
