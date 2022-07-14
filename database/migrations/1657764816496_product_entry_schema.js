"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductEntrySchema extends Schema {
  up() {
    this.create("product_entries", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("amount");
      table.float("unit_price");
      table.timestamps();
    });
  }

  down() {
    this.drop("product_entries");
  }
}

module.exports = ProductEntrySchema;
