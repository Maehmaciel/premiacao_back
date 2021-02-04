"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AutorSchema extends Schema {
  up() {
    this.create("autores", (table) => {
      table.increments();
      table.string("profissao").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
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
    this.drop("autores");
  }
}

module.exports = AutorSchema;
