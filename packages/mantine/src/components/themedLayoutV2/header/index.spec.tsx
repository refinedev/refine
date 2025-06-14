import React from "react";

import { layoutHeaderTests } from "@refinedev/ui-tests";

import { ThemedHeaderV2 } from "./index";
import { AppShell } from "@mantine/core";
import { TestWrapper } from "@test/index";

const Header = () => (
  <AppShell>
    <ThemedHeaderV2 />
  </AppShell>
);

describe("Header", () => {
  layoutHeaderTests.bind(this)(Header, TestWrapper);
});
