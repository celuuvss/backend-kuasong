const mongoose = require("mongoose");

const materialInventorySchema = new mongoose.Schema(
  {
    material_id: { type: String, required: true, unique: true },
    material_name: { type: String, required: true },
    unit: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    min_stock: { type: Number, required: true },
    supplier: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "material_inventory",
  },
);

module.exports = materialInventorySchema;
