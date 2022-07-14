"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  entry() {
    return this.hasMany("App/Models/ProductEntry");
  }

  inventory() {
    return this.hasMany("App/Models/Inventory");
  }
}

module.exports = Product;
