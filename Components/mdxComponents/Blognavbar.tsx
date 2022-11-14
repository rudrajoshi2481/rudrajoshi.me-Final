import {
  Box,
  Button,
  Heading,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
const blogs = [
  {
    name: "Welcome",
    link: "/articles/welcome",
    subPages:[]
  },
  {
    name:"🔥 Molecular Docking",
    link:"/articles/molecular-docking/1.1-Introduction-to-molecular-docking",
    subPages:[
      {
        name:"Introduction to Molecular Docking",
        link:"/articles/molecular-docking/1.1-Introduction-to-molecular-docking"
      },
      {
        name:"2.2-understanding-the-structure-ofprotein.mdx",
        link:"/articles/molecular-docking/2.2-understanding-the-structure-ofprotein"
      }
    ]
  }
];

function Navbar() {
  const [isLargerThan1800] = useMediaQuery("(min-width: 1800px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!isLargerThan1800) {
    return (
      <>
        <DrawerComp isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </>
    );
  } else {
    return (
      <Box
        // position={"absolute"}
        position={"fixed"}
        maxW="300"
        left="0"
        borderRight={"1px solid green"}
        borderTop={"1px solid green"}
        h="full"
      >
        <Heading p="2" m="2" fontSize={"x-large"}>
          🎯☠
        </Heading>

        <UnorderedList>
          {blogs.map((r) => {
            return (
              <ListItem
                  
                  fontWeight={"bold"}
                  p="2"
                  m="1"
                  listStyleType={"none"}
                >
              <Link  key={r.link} href={r.link}>
                  <Text>{r.name}</Text>
              </Link>
                <UnorderedList>
                  {
                    r.subPages.map(e => {
                      return <ListItem p="2"
                      m="1"
                      _hover={{color:"green.500"}}
                      ><Link href={e.link}>{e.name}</Link></ListItem>
                    })
                  }
                </UnorderedList>
                </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    );
  }
}

const DrawerComp = ({ isOpen, onOpen, onClose }: any) => {
  return (
    <>
      <Button variant={"outline"} colorScheme="teal" onClick={onOpen}>
        Articles
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>

          <DrawerBody>
            <UnorderedList>
              {blogs.map((r) => {
                return (
                  <Link key={r.link} href={r.link}>
                    <ListItem
                      p="2"
                      m="1"
                      listStyleType={"none"}
                      borderBottom="1px solid black"
                    >
                      {r.name}
                    </ListItem>
                  </Link>
                );
              })}
            </UnorderedList>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
