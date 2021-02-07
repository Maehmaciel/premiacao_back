"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AvaliacaoSchema extends Schema {
  up() {
    this.create("avaliacoes", (table) => {
      table.increments();
      table.string("parecer").notNullable();
      table.double("nota").notNullable();
      table
        .integer("avaliador_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("avaliadores")
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
    this.drop("avaliacoes");
  }
}

module.exports = AvaliacaoSchema;
