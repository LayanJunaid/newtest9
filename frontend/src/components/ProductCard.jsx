import { useProductStore } from "../store/product";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useToast,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

// destructuring the props obj passed to productCard {product}
const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { updateProduct, deleteProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleTempUpdate = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdate = async (id, newProduct) => {
    const { success, message } = await updateProduct(id, newProduct);
    if (success)
      toast({
        status: "success",
        duration: 3000,
        description: message,
        title: "Success",
        isClosable: true,
      });
    else {
      toast({
        status: "error",
        duration: 3000,
        description: message,
        title: "Error",
        isClosable: true,
      });
    }
    onClose();
  };

  const handleDelete = async (product_id) => {
    if (!window.confirm("Are you sure you want to delete product?")) return;
    const { success, message } = await deleteProduct(product_id);
    if (success)
      toast({
        status: "success",
        duration: 3000,
        description: message,
        title: "Success",
        isClosable: true,
      });
    else
      toast({
        status: "error",
        duration: 3000,
        description: message,
        title: "Error",
        isClosable: true,
      });
  };
  return (
    <Box
      shadow="lg"
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={() => {
              setUpdatedProduct(product);
              onOpen();
            }}
            colorScheme="blue"
          />
          <IconButton
            icon={<DeleteIcon />}
            // use product.id (from SQLite) instead of product._id
            onClick={() => handleDelete(product.id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={handleTempUpdate}
              />
              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={handleTempUpdate}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={handleTempUpdate}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              // use product.id
              onClick={() => handleSubmitUpdate(product.id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
