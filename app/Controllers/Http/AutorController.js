"use strict";

const Autor = use("App/Models/Autor");
const User = use("App/Models/User");

class AutorController {
  async index({ request, response, view }) {
    const autor = await Autor.query()
      .with("user")
      .with("projeto")
      .with("user.telefones")
      .with("user.enderecos")
      .fetch();

    return autor;
  }

  async store({ request, response }) {
    const autorData = request.only(["user", "profissao", "projeto_id"]);
    const user = await User.create(autorData.user);
    const { id, ...userData } = user.toJSON();
    const autor = await Autor.create({
      profissao: autorData.profissao,
      projeto_id: autorData.projeto_id,
      user_id: id,
    });
    return autor;
  }

  async show({ params, request, response, view }) {
    try {
      const autor = await Autor.findOrFail(params.id);

      return autor;
    } catch (error) {
      return response.status(error.status).send({ erro: "nao encontrado" });
    }
  }

  async update({ params, request, response }) {
    try {
      const autor = await Autor.findOrFail(params.id);
      const autorData = request.only(["autor"]);
      autor.merge(autorData);
      await autor.save();

      return autor;
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel atualizar" });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const autor = await Autor.findOrFail(params.id);
      await autor.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ erro: "nao foi possivel deletar" });
    }
  }
}

module.exports = AutorController;
