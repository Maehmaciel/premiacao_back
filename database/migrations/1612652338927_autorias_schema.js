"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AutoriasSchema extends Schema {
  up() {
    this.create("autorias", (table) => {
      table.increments();
      table
        .integer("projeto_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projetos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("autor_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("autores")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("autorias");
  }
}

module.exports = AutoriasSchema;
