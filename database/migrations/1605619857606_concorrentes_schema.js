"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConcorrentesSchema extends Schema {
  up() {
    this.create("concorrentes", (table) => {
      table.increments();
      table
        .integer("premio_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("premios")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("projeto_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projetos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("concorrentes");
  }
}

module.exports = ConcorrentesSchema;
