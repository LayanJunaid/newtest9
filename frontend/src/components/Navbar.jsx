import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { PlusSquareIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          {/* Dropdown Menu للتقارير */}
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              rightIcon={<ChevronDownIcon />}
            >
              Reports
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/reports/top-products">
                Top Products
              </MenuItem>
              <MenuItem as={Link} to="/reports/products-with-suppliers">
                Products With Suppliers
              </MenuItem>
            </MenuList>
          </Menu>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
