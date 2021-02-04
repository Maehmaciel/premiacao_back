"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
Route.resource("projeto", "ProjetoController").apiOnly();
Route.post("autor", "AutorController.store");
Route.post("avaliador", "AvaliadorController.store");
// Route.group(() => {
Route.get("users", "UserController.show");
Route.resource("autor", "AutorController");
Route.get("avaliador", "AvaliadorController.show");

Route.resource("premio", "PremioController").apiOnly();
Route.resource("projeto.avaliacao", "AvaliacaoController").apiOnly();
Route.resource("premio.cronograma", "CronogramaController").apiOnly();
Route.resource("user.endereco", "EnderecoController").apiOnly();
Route.resource("user.telefone", "TelefoneController").apiOnly();
// }).middleware(["auth"]);
