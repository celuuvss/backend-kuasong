const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI tidak ditemukan di .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

const branches = {
  surabaya: "branch_surabaya_db",
  jakarta: "branch_jakarta_db",
  bandung: "branch_bandung_db",
  semarang: "branch_semarang_db",
  bekasi: "branch_bekasi_db"
};

const getDB = (branchName = "surabaya") => {
  const key = branchName.toLowerCase();
  const dbName = branches[key] || branches.surabaya;

  if (!branches[key]) {
    console.warn(`⚠️ Branch "${branchName}" tidak ditemukan, pakai surabaya`);
  }

  console.log(`🔀 Using database: ${dbName}`);   // ← Logging penting
  return mongoose.connection.useDb(dbName);
};

const getModel = (modelName, schema, branchName = "surabaya") => {
  const db = getDB(branchName);
  
  // Hindari duplicate model
  if (db.models[modelName]) {
    return db.models[modelName];
  }

  return db.model(modelName, schema);
};

module.exports = { connectDB, getDB, getModel, branches };