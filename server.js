const express = require("express");
const cors = require("cors");
const { connectDB, getModel } = require("./config/db");

// Import Schemas
const employeeSchema = require("./models/Employee");
const productSchema = require("./models/Product");
const expenseSchema = require("./models/Expense");
const materialSchema = require("./models/Material");
const productInventorySchema = require("./models/product_inventory");
const materialInventorySchema = require("./models/material_inventory");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ====================== TEST ROUTE (untuk debug) ======================
app.get('/api/test', (req, res) => {
  const branch = req.query.branch || req.headers['x-branch'] || 'surabaya';
  res.json({
    message: "Backend Multi-Branch is running",
    currentBranch: branch,
    timestamp: new Date()
  });
});

// ====================== CRUD HELPER dengan Multi-Branch ======================
const createCRUDRoutes = (schema, routeName, collectionName) => {
  
  // GET ALL
  app.get(`/api/${routeName}`, async (req, res) => {
    try {
      const branch = req.query.branch || req.headers['x-branch'] || 'surabaya';
      console.log(`📥 GET ${routeName} → Branch: ${branch}`);

      const Model = getModel(collectionName || routeName, schema, branch);

      const data = await Model.find().sort({ created_at: -1 });
      const count = await Model.countDocuments();

      console.log(`✅ [${branch.toUpperCase()}] ${routeName} → ${count} data`);

      res.json({
        success: true,
        branch: branch,
        total: count,
        data: data
      });
    } catch (err) {
      console.error(`❌ Error GET ${routeName}:`, err);
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // CREATE
  app.post(`/api/${routeName}`, async (req, res) => {
    try {
      const branch = req.body.branch || req.query.branch || req.headers['x-branch'] || 'surabaya';
      console.log(`📥 POST ${routeName} → Branch: ${branch}`);

      const Model = getModel(collectionName || routeName, schema, branch);

      const item = new Model(req.body);
      await item.save();

      res.status(201).json({ success: true, branch: branch, data: item });
    } catch (err) {
      console.error(`❌ Error POST ${routeName}:`, err);
      res.status(400).json({ success: false, message: err.message });
    }
  });

  // UPDATE
  app.put(`/api/${routeName}/:id`, async (req, res) => {
    try {
      const branch = req.query.branch || req.headers['x-branch'] || 'surabaya';
      const Model = getModel(collectionName || routeName, schema, branch);

      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "Not found" });

      res.json({ success: true, branch: branch, data: updated });
    } catch (err) {
      console.error(`❌ Error PUT ${routeName}:`, err);
      res.status(400).json({ success: false, message: err.message });
    }
  });

  // DELETE
  app.delete(`/api/${routeName}/:id`, async (req, res) => {
    try {
      const branch = req.query.branch || req.headers['x-branch'] || 'surabaya';
      const Model = getModel(collectionName || routeName, schema, branch);

      await Model.findByIdAndDelete(req.params.id);
      res.json({ success: true, branch: branch, message: "Deleted" });
    } catch (err) {
      console.error(`❌ Error DELETE ${routeName}:`, err);
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

// ====================== ROUTES ======================
createCRUDRoutes(employeeSchema, "employees", "employees");
createCRUDRoutes(productSchema, "products", "products");
createCRUDRoutes(expenseSchema, "expenses", "expenses");
createCRUDRoutes(materialSchema, "materials", "materials");
createCRUDRoutes(productInventorySchema, "product_inventories", "product_inventory");
createCRUDRoutes(materialInventorySchema, "material_inventories", "material_inventory");

// ====================== CONNECT DB ======================
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di port ${PORT}`);
  console.log(`🌐 Test di browser: http://localhost:${PORT}/api/test?branch=jakarta`);
});