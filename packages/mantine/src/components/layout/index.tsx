import React from "react";
import { Box } from "@mantine/core";

import type { RefineLayoutLayoutProps } from "./types";
import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";

/**
 * @deprecated use `<ThemedLayout>` instead with 100% backward compatibility.
 * @see https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout
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
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            minHeight: "100vh",
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
