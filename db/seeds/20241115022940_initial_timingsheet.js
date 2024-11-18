/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("timingsheet").del();
  await knex("timingsheet").insert([
    { player: "player1", time: "00:00:40" },
    { player: "player2", time: "00:00:35" },
    { player: "player3", time: "00:00:45" },
    { player: "player4", time: "00:00:33" },
    { player: "player5", time: "00:00:20" },
  ]);
};
