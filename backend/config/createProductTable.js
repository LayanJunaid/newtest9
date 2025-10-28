import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const __dirname = path.resolve();

export let db;

export const connectDB = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, "database.sqlite"),
      driver: sqlite3.Database,
    });
    console.log("SQLite Database connected!");

    await db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.run(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        contact TEXT,
        address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    const prodCount = await db.get(`SELECT COUNT(*) AS cnt FROM products`);
    if (prodCount.cnt === 0) {
      await db.run(`
        INSERT INTO products (name, price, image) VALUES
          ('Product A', 10.5, 'imgA.png'),
          ('Product B', 20.0, 'imgB.png'),
          ('Product C', 15.75, 'imgC.png')
      `);
      console.log("Sample products added ✅");
    }

    const supCount = await db.get(`SELECT COUNT(*) AS cnt FROM suppliers`);
    if (supCount.cnt === 0) {
      await db.run(`
        INSERT INTO suppliers (product_id, name, contact, address) VALUES
          (1, 'Supplier One', '0555000001', 'Istanbul'),
          (1, 'Supplier Two', '0555000002', 'Istanbul - Kadikoy'),
          (2, 'Supplier Three', '0555000003', 'Ankara'),
          (3, 'Supplier Four', '0555000004', 'Izmir'),
          (2, 'Supplier Five', '0555000005', 'Bursa')
      `);
      console.log("Sample suppliers added ✅");
    }
  } catch (error) {
    console.error("Error connecting to SQLite:", error.message);
    process.exit(1);
  }
};
