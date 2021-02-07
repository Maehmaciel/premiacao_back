"use strict";
const Avaliacao = use("App/Models/Avaliacao");
const Avaliador = use("App/Models/Avaliador");
class AvaliacaoController {
  async index({ request, response, view }) {}

  async store({ params, request, response, view, auth }) {
    const avaliacaoData = request.only(["parecer", "nota"]);
    const avaliador = await Avaliador.query()
      .where("user_id", auth.user.id)
      .fetch();

    avaliacaoData.avaliador_id = avaliador.id;
    avaliacaoData.projeto_id = parseInt(params.projeto_id);
    const avaliacao = await Avaliacao.create(avaliacaoData);

    return avaliacao;
  }
  async show({ params, request, response, view }) {
    try {
      const avaliacao = await Avaliacao.findOrFail(params.id);

      return avaliacao;
    } catch (error) {
      return response.status(error.status).send({ erro: "nao encontrado" });
    }
  }

  async update({ params, request, response }) {
    try {
      const avaliacao = await Avaliacao.findOrFail(params.id);
      const avaliacaoData = request.only(["avaliacao"]);
      avaliacao.merge(avaliacaoData);
      await avaliacao.save();

      return avaliacao;
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel atualizar" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const avaliacao = await Avaliacao.findOrFail(params.id);
      await avaliacao.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel deletar" });
    }
  }
}

module.exports = AvaliacaoController;
