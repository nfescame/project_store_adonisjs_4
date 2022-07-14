"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OutputProductsSchema extends Schema {
  up() {
    this.create("output_products", (table) => {
      table.increments();
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
      table.date("output_date");

      table.timestamps();
    });
  }

  down() {
    this.drop("output_products");
  }
}

module.exports = OutputProductsSchema;
