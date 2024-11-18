const knex = require("../../../db/knex");
module.exports = {
  async findAll() {
    console.log("this.findAll");
    return knex("timingsheet").select("*").orderBy("time").limit(3);
  },
};
