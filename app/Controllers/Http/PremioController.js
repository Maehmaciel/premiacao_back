"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with premios
 */
const Premio = use("App/Models/Premio");

class PremioController {
  async index({ request, response, view }) {
    let premio = "";

    if (request.all().orderBy == "nota") {
      premio = await Premio.query()
        .with("vencedor.avaliacoes.avaliador")
        .has("vencedor")
        .fetch();
    } else {
      premio = await Premio.all();
    }

    return premio;
  }

  async store({ request, response }) {
    const premioData = request.only(["nome", "descricao", "ano"]);
    const premio = await Premio.create(premioData);
    return premio;
  }

  async show({ params, request, response, view }) {
    try {
      const premio = await Premio.findOrFail(params.id);

      return premio;
    } catch (error) {
      return response.status(error.status).send({ erro: "nao encontrado" });
    }
  }

  async update({ params, request, response }) {
    try {
      const premio = await Premio.findOrFail(params.id);
      const premioData = request.only(["premio"]);
      premio.merge(premioData);
      await premio.save();

      return premio;
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel atualizar" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const premio = await Premio.findOrFail(params.id);
      await premio.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel deletar" });
    }
  }
}

module.exports = PremioController;
