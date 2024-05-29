import React from "react";
import { Box } from "@mantine/core";

import type { RefineThemedLayoutProps } from "./types";
import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedLayout: React.FC<RefineThemedLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <Box sx={{ display: "flex" }}>
      <SiderToRender Title={Title} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "auto",
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={(theme) => ({
            padding: theme.spacing.sm,
          })}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
