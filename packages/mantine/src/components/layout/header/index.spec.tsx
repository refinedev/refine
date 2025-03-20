import { layoutHeaderTests } from "@refinedev/ui-tests";

import { Header } from "./index";
import { TestWrapper } from "@test";

describe("Header", () => {
  layoutHeaderTests.bind(this)(Header, TestWrapper);
});
