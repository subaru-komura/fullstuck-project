// Update with your config settings.
require("dotenv").config({ path: "./.env.local" });
const path = require("path");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: path.resolve("db/migrations"),
    },
    seeds: {
      directory: path.resolve("db/seeds"),
    },
  },
};
