"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Avaliador extends Model {
  static get table() {
    return "avaliadores";
  }
  user() {
    return this.hasOne("App/Models/User");
  }
}

module.exports = Avaliador;
