import express from "express";
import {
  getProducts,
  setProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getProducts).post(setProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);

export default router;
