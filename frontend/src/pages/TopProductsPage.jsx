import { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";

const TopProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/reports/top-products"
        );
        // if backend redirects to index.html you'll get HTML -> handle non-json
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error(
            "TopProducts: response is not JSON:",
            text.slice(0, 200),
            err
          );
          setProducts([]);
          return;
        }

        console.log("TopProducts API response:", data);

        let items = [];
        if (data && data.success) {
          if (Array.isArray(data.data)) items = data.data;
          else if (data.data && typeof data.data === "object") {
            // if backend returned single object, wrap it
            items = [data.data];
          }
        }
        setProducts(items);
      } catch (err) {
        console.error("TopProducts fetch error:", err);
        setProducts([]);
      }
    })();
  }, []);

  return (
    <Container py={12} maxW={"container.xl"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Top Priced Products 💰
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <Box
                key={
                  product.id ??
                  product._id ??
                  `${product.name}-${product.price}`
                }
                p={4}
                shadow="md"
                rounded="lg"
                borderWidth="1px"
              >
                <Heading size="md">{product.name}</Heading>
                <Text fontWeight="bold" mt={2}>
                  ${product.price}
                </Text>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </Box>
            ))
          ) : (
            <Text>No top products to display.</Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default TopProductsPage;
