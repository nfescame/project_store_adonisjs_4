"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PhoneSchema extends Schema {
  up() {
    this.create("phones", (table) => {
      table.increments();
      table
        .integer("client_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clients")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("phone");
      table.timestamps();
    });
  }

  down() {
    this.drop("phones");
  }
}

module.exports = PhoneSchema;
