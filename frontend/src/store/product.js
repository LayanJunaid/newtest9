import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // CREATE
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      set((state) => ({ products: [...(state.products || []), data.data] }));

      return {
        success: true,
        message: data.message || "Product created successfully.",
      };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  },

  // FETCH ALL
  fetchProducts: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      set({ products: data.data }); // <-- FIXED
    } catch (err) {
      console.error(err);
    }
  },

  // DELETE
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");
      const data = await res.json();

      set((state) => ({
        // use product.id (SQLite) instead of product._id
        products: state.products.filter((product) => product.id !== id),
      }));

      return { success: true, message: data.message || "Deleted successfully" };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  },

  // UPDATE
  updateProduct: async (id, newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to update product");
      const data = await res.json();

      set((state) => ({
        // compare by id field
        products: state.products.map((product) =>
          product.id === id ? data.data : product
        ),
      }));

      return {
        success: true,
        message: data.message || "Product Updated Successfully.",
      };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  },
}));
