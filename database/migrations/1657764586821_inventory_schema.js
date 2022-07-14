"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class InventorySchema extends Schema {
  up() {
    this.create("inventories", (table) => {
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
      table.timestamps();
    });
  }

  down() {
    this.drop("inventories");
  }
}

module.exports = InventorySchema;
