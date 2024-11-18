const knex = require("knex");
//knexfile.jsを読み込む
const knexConfig = require("../knexfile");
//環境変数を読み込む
const environment = process.env.NODE_ENV || "development";

//developmentの設定でインスタンス化する
module.exports = knex(knexConfig[environment]);
