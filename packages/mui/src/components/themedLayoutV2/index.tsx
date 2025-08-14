import React from "react";
import Box from "@mui/material/Box";

import { ThemedLayoutContextProvider } from "@contexts";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";

import type { BoxProps } from "@mui/material";
import type { RefineThemedLayoutV2Props } from "./types";

interface ExtendedRefineThemedLayoutV2Props extends RefineThemedLayoutV2Props {
  /**
   * Additional properties for the children box.
   * This type includes all properties of BoxProps, including 'sx'.
   */
  childrenBoxProps?: BoxProps;

  /**
   * Additional properties for the container box.
   * This type includes all properties of BoxProps, including 'sx'.
   */
  containerBoxProps?: BoxProps;
}

export const ThemedLayoutV2: React.FC<ExtendedRefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
  initialSiderCollapsed,
  onSiderCollapsed,
  childrenBoxProps = {},
  containerBoxProps = {},
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  const { sx: childrenSx, ...restChildrenProps } = childrenBoxProps;
  const { sx: containerSx, ...restContainerProps } = containerBoxProps;

  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapsed}
    >
      <Box
        sx={{ display: "flex", flexDirection: "row", ...containerSx }}
        {...restContainerProps}
      >
        <SiderToRender Title={Title} />
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: "1px",
              minHeight: "1px",
            },
          ]}
        >
          <HeaderToRender />
          <Box
            component="main"
            sx={{
              p: { xs: 1, md: 2, lg: 3 },
              flexGrow: 1,
              bgcolor: (theme) => theme.palette.background.default,
              ...childrenSx,
            }}
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
