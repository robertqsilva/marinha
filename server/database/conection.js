const knex = require("knex")({
  client: "pg",
  connection: process.env.DATABASE,
});

module.exports = knex;
