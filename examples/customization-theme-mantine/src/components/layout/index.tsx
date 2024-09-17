import React from "react";
import { AppShell } from "@mantine/core";

import {
  type RefineThemedLayoutV2Props,
  ThemedLayoutContextProvider,
} from "@refinedev/mantine";

import {
  ThemedSiderV2 as DefaultSider,
  ThemedHeaderV2 as DefaultHeader,
} from "@refinedev/mantine";

export const Layout: React.FC<RefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  initialSiderCollapsed,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <AppShell
        header={{
          height: {
            base: 0,
            xs: 50,
            sm: 50,
          },
        }}
        navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: true } }}
        padding="md"
      >
        <AppShell.Header>
          <HeaderToRender />
        </AppShell.Header>

        <AppShell.Navbar>
          <SiderToRender />
        </AppShell.Navbar>

        <AppShell.Main>
          {children}

          {Footer && <Footer />}
        </AppShell.Main>

        {OffLayoutArea && <OffLayoutArea />}
      </AppShell>
    </ThemedLayoutContextProvider>
  );
};
