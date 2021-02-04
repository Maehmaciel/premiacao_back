"use strict";
const Endereco = use("App/Models/Endereco");

class EnderecoController {
  async index({ request, response, view }) {}

  async store({ params, request, response, view }) {
    const enderecoData = request.only([
      "cidade",
      "bairro",
      "uf",
      "cep",
      "numero",
      "rua",
    ]);

    enderecoData.user_id = parseInt(params.user_id);
    const endereco = await Endereco.create(enderecoData);

    return endereco;
  }

  async show({ params, request, response, view }) {
    try {
      const endereco = await Endereco.findOrFail(params.id);

      return endereco;
    } catch (error) {
      return response.status(error.status).send({ erro: "nao encontrado" });
    }
  }

  async update({ params, request, response }) {
    try {
      const endereco = await Endereco.findOrFail(params.id);
      const enderecoData = request.only(["endereco"]);
      endereco.merge(enderecoData);
      await endereco.save();

      return endereco;
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel atualizar" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const endereco = await Endereco.findOrFail(params.id);
      await endereco.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel deletar" });
    }
  }
}

module.exports = EnderecoController;
