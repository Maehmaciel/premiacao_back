"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CronogramaSchema extends Schema {
  up() {
    this.create("cronogramas", (table) => {
      table.increments();
      table.string("descricao").notNullable();
      table.date("dataInicio").notNullable();
      table.date("dataFim").notNullable();
      table
        .integer("premio_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("premios")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("cronogramas");
  }
}

module.exports = CronogramaSchema;
