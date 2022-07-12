"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Client extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  address() {
    return this.hasOne("App/Models/Address");
  }
  phone() {
    return this.hasMany("App/Models/Phone");
  }
}

module.exports = Client;
