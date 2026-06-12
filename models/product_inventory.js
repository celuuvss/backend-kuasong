const mongoose = require("mongoose");

const productInventorySchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true, unique: true },
    product_name: { type: String, required: true },
    category: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    min_stock: { type: Number, required: true },
    max_stock: { type: Number, required: true },
    last_restocked: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "product_inventory",
  },
);

module.exports = productInventorySchema;
