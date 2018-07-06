'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/cheaptix_db',
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/cheaptix_test',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
