import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";
import type { RefineThemedLayoutProps } from "./types";

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedLayout: React.FC<RefineThemedLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const [isSiderOpen, setIsSiderOpen] = useState(true);

  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <Box display="flex">
      <SiderToRender Title={Title} isSiderOpen={isSiderOpen} />
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        overflow="hidden"
        minH="100vh"
      >
        <HeaderToRender
          isSiderOpen={isSiderOpen}
          onToggleSiderClick={() => {
            return setIsSiderOpen((prevValue) => !prevValue);
          }}
        />
        <Box p={[2, 4]}>{children}</Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
