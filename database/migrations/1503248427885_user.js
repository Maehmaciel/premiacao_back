"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("nome").notNullable();
      table.string("email").notNullable().unique();
      table.integer("idade").notNullable();
      table.string("password").notNullable();
      table.boolean("isAvaliador").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
