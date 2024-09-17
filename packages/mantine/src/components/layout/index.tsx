import React from "react";
import { AppShell } from "@mantine/core";

import type { RefineLayoutLayoutProps } from "./types";
import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";

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
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 200, breakpoint: "md", collapsed: { mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderToRender />
      </AppShell.Header>

      <AppShell.Navbar>
        <SiderToRender Title={Title} />
      </AppShell.Navbar>

      <AppShell.Main>
        {children}

        {Footer && <Footer />}
      </AppShell.Main>

      {OffLayoutArea && <OffLayoutArea />}
    </AppShell>
  );
};
