import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";
import type { RefineLayoutLayoutProps } from "./types";

/**
 * @deprecated use `<ThemedLayout>` instead with 100% backward compatibility.
 * @see https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-themed-layout
 **/
export const Layout: React.FC<RefineLayoutLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box display="flex" bg={bg}>
      <SiderToRender Title={Title} />
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        overflow="hidden"
        minH="100vh"
      >
        <HeaderToRender />
        <Box p={[2, 4]}>{children}</Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
