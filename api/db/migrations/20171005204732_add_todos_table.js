//
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("Todos", function(table) {
    table.string("id").primary();
    table.string("text");
    table.enu("priority", ["HIGH", "MEDIUM", "LOW"]);
    table.date("dueDate");
    table.boolean("completed").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("Todos");
};
