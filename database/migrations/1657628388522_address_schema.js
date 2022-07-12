"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", (table) => {
      table.increments();
      table
        .integer("client_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clients")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("street");
      table.string("number");
      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
