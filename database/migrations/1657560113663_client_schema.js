"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClientSchema extends Schema {
  up() {
    this.create("clients", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("name");
      table.string("last_name");
      table.string("cpf");
      table.string("rg");
      table.date("birth_date");
      table.string("phone");
      table.timestamps();
    });
  }

  down() {
    this.drop("clients");
  }
}

module.exports = ClientSchema;
