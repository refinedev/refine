import React from "react";
import { AppShell } from "@mantine/core";

import type { RefineThemedLayoutV2Props } from "./types";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { ThemedLayoutContextProvider } from "../../contexts";

import { useThemedLayoutContext } from "@hooks";

const ThemedLayoutV2WithoutContext: React.FC<RefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  const { siderCollapsed, mobileSiderOpen } = useThemedLayoutContext();

  return (
    <AppShell
      header={{
        height: 50,
      }}
      navbar={{
        width: siderCollapsed ? 60 : 200,
        breakpoint: "md",
        collapsed: {
          mobile: !mobileSiderOpen,
          desktop: false,
        },
      }}
      padding="md"
      layout="alt"
    >
      <AppShell.Header>
        <HeaderToRender />
      </AppShell.Header>

      <AppShell.Navbar withBorder={false}>
        <SiderToRender Title={Title} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      {Footer && (
        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      )}

      {OffLayoutArea && <OffLayoutArea />}
    </AppShell>
  );
};

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
  initialSiderCollapsed,
  ...restProps
}) => {
  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <ThemedLayoutV2WithoutContext {...restProps} />
    </ThemedLayoutContextProvider>
  );
};
