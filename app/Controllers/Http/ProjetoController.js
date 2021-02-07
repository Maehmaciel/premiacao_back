"use strict";

const Projeto = use("App/Models/Projeto");
const Database = use("Database");
class ProjetoController {
  async index({ request, response, view }) {
    let projeto = "";

    if (request.all().avaliado == "true") {
      projeto = await Projeto.query()
        .with("autores.user")
        .with("avaliacoes.avaliador.user")
        .with("premios")
        .has("avaliacoes")
        .fetch();
    } else if (request.all().avaliado == "false") {
      projeto = await Projeto.query()
        .with("autores.user")
        .with("premios")
        .doesntHave("avaliacoes")
        .fetch();
    } else {
      projeto = await Projeto.query()
        .with("autores.user")
        .with("premios")
        .with("avaliacoes.avaliador.user")
        .fetch();
    }

    return projeto;
  }

  async store({ request, response }) {
    const { premios, autores, ...projetoData } = request.only([
      "premios",
      "autores",
      "titulo",
      "resumo",
      "areaAtuacao",
    ]);

    const projeto = await Projeto.create(projetoData);
    if (premios && premios.length > 0) {
      await projeto.premios().attach(premios);
      await projeto.load("premios");
    }
    if (autores && autores.length > 0) {
      await projeto.autores().attach(autores);
      await projeto.load("autores");
    }
    return projeto;
  }

  async show({ params, request, response, view }) {
    try {
      const projeto = await Projeto.findOrFail(params.id);

      return projeto;
    } catch (error) {
      return response.status(error.status).send({ erro: "nao encontrado" });
    }
  }

  async update({ params, request, response }) {
    try {
      const projeto = await Projeto.findOrFail(params.id);
      const projetoData = request.only(["premios", "autores"]);
      projeto.merge(projetoData);
      await projeto.save();

      return projeto;
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel atualizar" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const projeto = await Projeto.findOrFail(params.id);
      await projeto.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel deletar" });
    }
  }
}

module.exports = ProjetoController;
