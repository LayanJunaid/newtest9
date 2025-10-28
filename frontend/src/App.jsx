import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import { useColorModeValue } from "@chakra-ui/react";
import TopProductsPage from "./pages/TopProductsPage";
import ProductsWithSuppliersPage from "./pages/ProductsWithSuppliersPage.jsx";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* ✅ أضف هذا السطر */}
        <Route path="/reports/top-products" element={<TopProductsPage />} />

        <Route
          path="/reports/products-with-suppliers"
          element={<ProductsWithSuppliersPage />}
        />
      </Routes>
    </Box>
  );
}

export default App;
