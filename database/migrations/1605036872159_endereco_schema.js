"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EnderecoSchema extends Schema {
  up() {
    this.create("enderecos", (table) => {
      table.increments();
      table.string("cidade").notNullable();
      table.string("uf").notNullable();
      table.string("bairro").notNullable();
      table.integer("cep").notNullable();
      table.integer("numero").notNullable();
      table.string("rua").notNullable();
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
    this.drop("enderecos");
  }
}

module.exports = EnderecoSchema;
