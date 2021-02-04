"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Premio extends Model {
  projetos() {
    return this.belongsToMany("App/Models/Projeto").pivotTable("concorrentes");
  }
  vencedor() {
    return this.belongsTo("App/Models/Projeto");
  }
}

module.exports = Premio;
