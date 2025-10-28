import { db } from "../config/createProductTable.js"; // استدعاء الاتصال بالDB

// This SQL code selects all products, sorts them by price (highest first),
// and only returns the top 5 rows.
export const getTopProducts = async (req, res) => {
  try {
    const products = await db.all(
      "SELECT * FROM products ORDER BY price DESC LIMIT 5"
    );
    // ensure we always return an array
    res
      .status(200)
      .json({ success: true, data: Array.isArray(products) ? products : [] });
  } catch (error) {
    console.error("getTopProducts error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// This SQL joins the products table with the suppliers table
// using the foreign key (product_id).
// It returns product info along with each related supplier.
export const getProductsWithSuppliers = async (req, res) => {
  try {
    const rows = await db.all(
      `SELECT 
         p.id AS product_id, p.name AS product_name, p.price, p.image,
         s.id AS supplier_id, s.name AS supplier_name, s.contact, s.address
       FROM products p
       LEFT JOIN suppliers s ON s.product_id = p.id
       ORDER BY p.id`
    );

    // group suppliers under each product
    const productsMap = new Map();
    for (const r of rows) {
      const pid = r.product_id;
      if (!productsMap.has(pid)) {
        productsMap.set(pid, {
          id: pid,
          name: r.product_name,
          price: r.price,
          image: r.image,
          suppliers: [],
        });
      }
      if (r.supplier_id) {
        productsMap.get(pid).suppliers.push({
          id: r.supplier_id,
          name: r.supplier_name,
          contact: r.contact,
          address: r.address,
        });
      }
    }

    const products = Array.from(productsMap.values());
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("getProductsWithSuppliers error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
