const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expense_id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: String,
  reference: String,
}, { 
  timestamps: true,
  collection: 'expenses'
});

module.exports = expenseSchema;