"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TelefoneSchema extends Schema {
  up() {
    this.create("telefones", (table) => {
      table.increments();
      table.integer("numero").notNullable();
      table.string("ddd").notNullable();
      table.string("tipo").notNullable();
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
    this.drop("telefones");
  }
}

module.exports = TelefoneSchema;
