const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  material_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  cost_per_unit: { type: Number, required: true },
  is_active: { type: Boolean, default: true },
}, { 
  timestamps: true,
  collection: 'materials'
});

module.exports = materialSchema;