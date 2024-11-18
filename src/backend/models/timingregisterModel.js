const knex = require("../../../db/knex");
module.exports = {
  async register(record) {
    console.log("this.register");
    return knex("timingsheet").insert(record);
  },
};
