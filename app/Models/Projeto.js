"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Projeto extends Model {
  autores() {
    return this.belongsToMany("App/Models/Autor").pivotTable("autorias");
  }
  premios() {
    return this.belongsToMany("App/Models/Premio").pivotTable("concorrentes");
  }

  avaliacoes() {
    return this.hasMany("App/Models/Avaliacao");
  }
}

module.exports = Projeto;
