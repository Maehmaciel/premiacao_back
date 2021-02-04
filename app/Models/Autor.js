"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Autor extends Model {
  static get table() {
    return "autores";
  }
  projeto() {
    return this.belongsTo("App/Models/Projeto");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Autor;
