import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/createProductTable.js";
import productRouter from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";
import reportRouter from "./routes/report.route.js";
dotenv.config({ debug: true });

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/reports", reportRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // catch-all middleware for SPA
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log("Server started at http://localhost:5000")
  );
});
