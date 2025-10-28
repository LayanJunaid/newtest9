import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const response = await createProduct(newProduct);
    // response should be { success, message } or { success, data, message }
    if (response.success) {
      toast({
        title: "Success",
        description: response.message || "Product created successfully",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toast({
        title: "Error",
        description: response.message || "Failed to create product",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW={"container.sm"} mt={"7%"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          shadow={"md"}
          rounded={"lg"}
        >
          <VStack spacing={4}>
            <Input
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Product Name"
            />
            <Input
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Price"
            />
            <Input
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              placeholder="Image URL"
            />
            <Button colorScheme="blue" w="full" onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
