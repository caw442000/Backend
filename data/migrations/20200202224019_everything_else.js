exports.up = function(knex) {
  return knex.schema
    .createTable("chores", tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.text("description").notNullable();
      tbl.dateTime("createdAt").defaultTo(knex.fn.now());
      tbl.dateTime("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("child_details", tbl => {
      tbl.increments();
      tbl
        .integer("child_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("child")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("chore_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("chores")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.boolean("completed").defaultTo(false);
      tbl.dateTime("createdAt").defaultTo(knex.fn.now());
      tbl.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("child_details")
    .dropTableIfExists("chores");
};
