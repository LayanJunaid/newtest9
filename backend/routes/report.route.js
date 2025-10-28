import express from "express";

import {
  getTopProducts,
  getProductsWithSuppliers,
} from "../controllers/report.controller.js";

const router = express.Router();

// Route: /api/reports/top-products
router.get("/top-products", getTopProducts);

// Route: /api/reports/products-with-suppliers
router.get("/products-with-suppliers", getProductsWithSuppliers);

export default router;
