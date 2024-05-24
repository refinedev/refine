import React from "react";
import Box from "@mui/material/Box";

import type { RefineLayoutLayoutProps } from "./types";
import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";

/**
 * @deprecated use `<ThemedLayout>` instead with 100% backward compatibility.
 * @see https://refine.dev/docs/api-reference/mui/components/mui-themed-layout
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
    <Box display="flex" flexDirection="row">
      <SiderToRender Title={Title} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
