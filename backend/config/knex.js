module.exports = require('knex')({
  client: 'pg',
  connection: {
      host: 'localhost',
      port: '5432',
      user: 'postgres',
      password: 'postgres',
      database: 'crud'
  }
});
