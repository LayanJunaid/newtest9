import { db } from "../config/createProductTable.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await db.all("SELECT * FROM products");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// CREATE product
export const setProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  try {
    const result = await db.run(
      "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
      [name, price, image]
    );
    const newProduct = await db.get("SELECT * FROM products WHERE id = ?", [
      result.lastID,
    ]);
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price || !image)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  try {
    const result = await db.run(
      "UPDATE products SET name = ?, price = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, price, image, id]
    );

    if (result.changes === 0)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const updatedProduct = await db.get("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.run("DELETE FROM products WHERE id = ?", [id]);
    if (result.changes === 0)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
