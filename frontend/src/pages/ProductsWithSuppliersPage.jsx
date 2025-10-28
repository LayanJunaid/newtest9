import { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Image,
  Stack,
} from "@chakra-ui/react";

const ProductsWithSuppliersPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports/products-with-suppliers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) setProducts(data.data);
        else setProducts([]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container py={12} maxW={"container.xl"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Products with Suppliers 🏷️
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {products.map((product) => (
            <Box
              key={product.id}
              p={4}
              shadow="md"
              rounded="lg"
              borderWidth="1px"
            >
              <Heading size="md">{product.name}</Heading>
              <Text fontWeight="bold" mt={2}>
                ${product.price}
              </Text>
              <Image
                src={product.image}
                alt={product.name}
                objectFit="cover"
                h="200px"
                w="full"
                mt={2}
              />

              <Box mt={4}>
                <Heading size="sm" mb={2}>
                  Suppliers:
                </Heading>
                {product.suppliers.length > 0 ? (
                  <Stack spacing={1}>
                    {product.suppliers.map((sup) => (
                      <Text key={sup.id}>
                        {sup.name} — {sup.contact} — {sup.address}
                      </Text>
                    ))}
                  </Stack>
                ) : (
                  <Text>No suppliers</Text>
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default ProductsWithSuppliersPage;
