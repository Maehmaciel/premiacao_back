"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PremioSchema extends Schema {
  up() {
    this.create("premios", (table) => {
      table.increments();
      table.string("nome").notNullable();
      table.text("descricao").notNullable();
      table.integer("ano").notNullable();
      table
        .integer("projeto_id")
        .unsigned()
        .references("id")
        .inTable("projetos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("premios");
  }
}

module.exports = PremioSchema;
