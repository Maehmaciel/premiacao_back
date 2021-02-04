"use strict";
const Telefone = use("App/Models/Telefone");
class TelefoneController {
  async index({ request, response, view }) {}

  async store({ params, request, response, view }) {
    const telefoneData = request.only(["numero", "ddd", "tipo"]);

    telefoneData.user_id = parseInt(params.user_id);
    const telefone = await Telefone.create(telefoneData);

    return telefone;
  }
  async show({ params, request, response, view }) {
    try {
      const telefone = await Telefone.findOrFail(params.id);

      return telefone;
    } catch (error) {
      return response.status(error.status).send({ erro: "nao encontrado" });
    }
  }

  async update({ params, request, response }) {
    try {
      const telefone = await Telefone.findOrFail(params.id);
      const telefoneData = request.only(["telefone"]);
      telefone.merge(telefoneData);
      await telefone.save();

      return telefone;
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel atualizar" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const telefone = await Telefone.findOrFail(params.id);
      await telefone.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel deletar" });
    }
  }
}

module.exports = TelefoneController;
