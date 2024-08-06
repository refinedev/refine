import type { PropsWithChildren } from "react";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { Box } from "@mui/material";
import { Header } from "./header";
import { Sider } from "./sider";

type Props = PropsWithChildren<{}>;

export const Layout = ({ children }: Props) => {
  return (
    <ThemedLayoutV2 Header={() => <Header />} Sider={() => <Sider />}>
      <Box
        sx={{
          p: { xs: "16px", md: "8px", lg: "0px" },
        }}
      >
        {children}
      </Box>
    </ThemedLayoutV2>
  );
};
