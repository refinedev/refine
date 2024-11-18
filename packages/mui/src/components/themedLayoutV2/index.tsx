import React from "react";

import Box from "@mui/material/Box";

import { ThemedLayoutContextProvider } from "@contexts";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import type { RefineThemedLayoutV2Props } from "./types";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
  initialSiderCollapsed,
  containerBoxProps = {},
  childrenBoxProps = {},
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  const { sx: containerSx, ...restContainerProps } = containerBoxProps;
  const { sx: childrenSx, ...restChildrenProps } = childrenBoxProps;

  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <Box
        sx={{ display: "flex", flexDirection: "row", ...containerSx }}
        {...restContainerProps}
      >
        <SiderToRender Title={Title} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <HeaderToRender />
          <Box
            component="main"
            sx={{ flexGrow: 1, ...childrenSx }}
            {...restChildrenProps}
          >
            {children}
          </Box>
          {Footer && <Footer />}
        </Box>
        {OffLayoutArea && <OffLayoutArea />}
      </Box>
    </ThemedLayoutContextProvider>
  );
};
