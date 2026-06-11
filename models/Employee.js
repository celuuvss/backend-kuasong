const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  shift: { type: String, default: "full_day" },
  salary: { type: Number, required: true },
}, { 
  timestamps: true,
  collection: 'employees'     // ← Ini yang penting
});

module.exports = employeeSchema;