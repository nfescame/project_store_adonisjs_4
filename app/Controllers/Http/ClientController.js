"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const Client = use("App/Models/Client");
const Phone = use("App/Models/Phone");
const Address = use("App/Models/Address");

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
    const clients = await Client.query()
      .select("id", "user_id", "name", "last_name", "created_at")
      .with("user", (builder) => builder.select("id", "username", "email"))
      .fetch();

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
  async store({ request, auth, response }) {
    const {
      name,
      last_name,
      cpf,
      rg,
      birth_date,
      phone_number,
      street,
      number,
    } = request.only([
      "name",
      "last_name",
      "cpf",
      "rg",
      "birth_date",
      "phone_number",
      "street",
      "number",
    ]);

    const client = await Client.create({
      user_id: auth.user.id,
      name,
      last_name,
      cpf,
      rg,
      birth_date,
    });

    const address = await Address.create({
      client_id: client.id,
      street,
      number,
    });

    const phone = await Phone.create({
      client_id: client.id,
      phone: phone_number,
    });

    return response.status("200").json({ data: { client, address, phone } });
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
      .select("id", "user_id", "name", "last_name", "cpf", "rg", "birth_date")
      .with("user", (builder) => builder.select("id", "username", "email"))
      .with("address", (builder) =>
        builder.select("id", "client_id", "street", "number")
      )
      .with("phone", (builder) => builder.select("id", "client_id", "phone"))
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
