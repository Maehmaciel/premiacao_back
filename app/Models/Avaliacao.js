"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Avaliacao extends Model {
  static get table() {
    return "avaliacoes";
  }

  avaliador() {
    return this.belongsTo("App/Models/Avaliador");
  }
  projeto() {
    return this.hasOne("App/Models/Projeto");
  }
}

module.exports = Avaliacao;
