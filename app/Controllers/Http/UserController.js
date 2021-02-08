"use strict";
const User = use("App/Models/User");
class UserController {
  async login({ response, request, auth }) {
    try {
      const { email, password } = request.all();
      const webToken = await auth.attempt(email, password);

      const user = await User.findByOrFail("email", email);
      webToken.isAvaliador = user.isAvaliador;
      return webToken;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: "Email ou senha Incorretos" });
    }
  }
}
module.exports = UserController;
