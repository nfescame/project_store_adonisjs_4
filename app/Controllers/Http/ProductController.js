"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use("App/Models/Product");
const ProductEntry = use("App/Models/ProductEntry");
const Inventory = use("App/Models/Inventory");

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const products = await Product.query()
      .with("user", (builder) => builder.select("id", "username", "email"))
      .with("entry")
      .with("inventory")
      .fetch();

    return response
      .status(200)
      .json({ total_products: products.rows.length, products: products });
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { title, description, amount, unit_price } = request.only([
      "title",
      "description",
      "amount",
      "unit_price",
    ]);

    const product = await Product.create({
      user_id: auth.user.id,
      is_active: 0,
      title,
      description,
      inventory_min: 10,
      inventory_max: 99,
    });

    const product_entry = await ProductEntry.create({
      user_id: auth.user.id,
      product_id: product.id,
      amount,
      unit_price,
    });

    const inventory = await Inventory.create({
      product_id: product.id,
      amount,
      unit_price,
    });

    return response
      .status(200)
      .json({ data: { product, product_entry, inventory } });
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ProductController;
