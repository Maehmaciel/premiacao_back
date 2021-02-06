"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Autor extends Model {
  static get table() {
    return "autores";
  }
  projetos() {
    return this.belongsToMany("App/Models/Projeto").pivotTable("autorias");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Autor;
