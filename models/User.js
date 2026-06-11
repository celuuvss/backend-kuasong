const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employee_id: String,
  name: String,
  role: String,
  shift: String,
  salary: Number,
  created_at: Date,
}, { 
  strict: false,
  timestamps: true   // otomatis menambah createdAt & updatedAt
});

// Export schema saja (bukan model)
module.exports = userSchema;