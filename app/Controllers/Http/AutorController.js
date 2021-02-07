"use strict";

const Autor = use("App/Models/Autor");
const User = use("App/Models/User");

class AutorController {
  async index({ request, response, view, auth }) {
    const autor = await Autor.query()
      .with("user")
      .where("user_id", auth.user.id)
      .with("projetos")
      .with("user.telefones")
      .with("user.enderecos")
      .fetch();

    return autor;
  }
  async lista({ request, response, view }) {
    //este metodo lista autores que nao estao ligados a um projeto informado
    const autor = await Autor.query()
      .with("user")
      .whereDoesntHave("projetos", (builder) => {
        builder.where("projeto_id", request.all().projeto);
      })
      .with("projetos")
      .with("user.telefones")
      .with("user.enderecos")
      .fetch();

    return autor;
  }

  async store({ request, response }) {
    const autorData = request.only(["user", "profissao", "projetos"]);
    const user = await User.create(autorData.user);
    const { id, ...userData } = user.toJSON();
    const autor = await Autor.create({
      profissao: autorData.profissao,
      user_id: id,
    });
    if (autorData.projetos && autorData.projetos.length > 0) {
      await autor.projetos().attach(autorData.projetos);
      await autor.load("projetos");
    }
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
