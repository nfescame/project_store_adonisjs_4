"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const Client = use("App/Models/Client");

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({}) {
    const clients = await Client.query().with("user").fetch();

    return clients;
  }

  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only([
      "name",
      "last_name",
      "cpf",
      "rg",
      "birth_date",
      "phone",
    ]);
    const client = await Client.create({ user_id: auth.user.id, ...data });

    return client;
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const client = await Client.query()
      .with("user")
      .where("id", params.id)
      .first();

    return client;
  }

  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      "name",
      "last_name",
      "cpf",
      "rg",
      "birth_date",
      "phone",
    ]);
    const client = await Client.find(params.id);

    client.merge(data);

    client.save();

    return response.status(200).json({ client });
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const client = await Client.findOrFail(params.id);

    await client.delete();
  }
}

module.exports = ClientController;
