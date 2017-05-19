// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './data/bb3.sqlite3'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
