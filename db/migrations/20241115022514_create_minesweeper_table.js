exports.up = function (knex) {
  return knex.schema.createTable("timingsheet", function (table) {
    table.increments("id").primary();
    table.string("player").notNullable();
    // table.interval("time").notNullable();//knexではinterval型は存在しないらしい
    table.specificType("time", "INTERVAL").notNullable(); // INTERVAL型のカラム
    // https://knexjs.org/guide/schema-builder.html#specifictype
    // https://stackoverflow.com/questions/73390010/how-can-i-create-a-fixed-length-char-type-table-column-by-createtable-in-the-nod
  });
};

// minesweeper=# \d timingsheet
//                                     Table "public.timingsheet"
//  Column |          Type          | Collation | Nullable |                 Default
// --------+------------------------+-----------+----------+-----------------------------------------
//  id     | integer                |           | not null | nextval('timingsheet_id_seq'::regclass)
//  player | character varying(255) |           | not null |
//  time   | interval               |           | not null |
// Indexes:
//     "timingsheet_pkey" PRIMARY KEY, btree (id)

exports.down = function (knex) {
  return knex.schema.dropTable("timingsheet");
};
