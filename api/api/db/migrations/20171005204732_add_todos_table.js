//
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("Todos", function(table) {
    table.increments("id");
    table.string("text");
    table.enu("priority", ["HIGH", "MEDIUM", "LOW"]);
    table.date("dueDate");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("Todos");
};
