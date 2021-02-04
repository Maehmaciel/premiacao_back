"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AvaliadorSchema extends Schema {
  up() {
    this.create("avaliadores", (table) => {
      table.increments();
      table.string("areaAtuacao").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("avaliadores");
  }
}

module.exports = AvaliadorSchema;
