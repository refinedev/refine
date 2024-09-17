import React from "react";

import { layoutHeaderTests } from "@refinedev/ui-tests";

import { ThemedHeader } from "./index";
import { AppShell } from "@mantine/core";
import { TestWrapper } from "@test/index";

const Header = () => (
  <AppShell>
    <ThemedHeader />
  </AppShell>
);
describe("Header", () => {
  layoutHeaderTests.bind(this)(Header, TestWrapper);
});
