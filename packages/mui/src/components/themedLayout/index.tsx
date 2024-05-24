import React, { useState } from "react";
import Box from "@mui/material/Box";

import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";
import type { RefineThemedLayoutProps } from "./types";

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
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
    <Box display="flex" flexDirection="row">
      <SiderToRender
        Title={Title}
        isSiderOpen={isSiderOpen}
        onToggleSiderClick={(isOpen) => setIsSiderOpen(Boolean(isOpen))}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <HeaderToRender
          isSiderOpen={isSiderOpen}
          onToggleSiderClick={() => setIsSiderOpen((prev) => !prev)}
        />
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
