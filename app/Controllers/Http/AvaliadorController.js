"use strict";

const Avaliador = use("App/Models/Avaliador");
const User = use("App/Models/User");

class AvaliadorController {
  async index({ request, response, view }) {}

  async store({ request, response }) {
    const avaliadorData = request.only(["user", "areaAtuacao"]);
    const user = await User.create(avaliadorData.user);

    const { id, ...userData } = user.toJSON();
    const avaliador = await Avaliador.create({
      areaAtuacao: avaliadorData.areaAtuacao,

      user_id: id,
    });
    return avaliador;
  }

  async show({ params, request, response, view }) {
    try {
      const avaliador = await Avaliador.findOrFail(params.id);

      return avaliador;
    } catch (error) {
      return response.status(error.status).send({ erro: "nao encontrado" });
    }
  }

  async update({ params, request, response }) {
    try {
      const avaliador = await Avaliador.findOrFail(params.id);
      const avaliadorData = request.only(["avaliador"]);
      avaliador.merge(avaliadorData);
      await avaliador.save();

      return avaliador;
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel atualizar" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const avaliador = await Avaliador.findOrFail(params.id);
      await avaliador.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel deletar" });
    }
  }
}

module.exports = AvaliadorController;
