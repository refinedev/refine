import React from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

import { RefineThemedLayoutProps } from "./types";
import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";
import { ThemedLayoutContextProvider } from "../../contexts";

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
    <ThemedLayoutContextProvider>
          <AppShell
            header={{ height: 50 }}
            navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: true } }}
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
        </ThemedLayoutContextProvider>
      )
};
