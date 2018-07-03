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
    connection: 'postgres://uvmuszzigdygou:ec9c1ee58b852c1b0cebc46e90a01c04da9197d980e8247d8ba6de13697b5bf2@ec2-54-235-249-33.compute-1.amazonaws.com:5432/db215118eee8g4'
  }
};
