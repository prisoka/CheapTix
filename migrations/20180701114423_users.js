// id
// user_type - text (NN)
// email - text (NN)
// username - text (NN)
// password - text (NN)
// date - date time

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('user_type').notNullable();
    table.string('email').notNullable();
    table.string('username').notNullable();
    table.text('password').notNullable();
    table.datetime('date').notNullable;
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
