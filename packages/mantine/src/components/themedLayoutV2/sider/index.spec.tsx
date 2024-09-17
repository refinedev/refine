import { layoutSiderTests } from "@refinedev/ui-tests";

import { ThemedSiderV2 } from "./index";
import { TestWrapper } from "@test/index";

describe("ThemedSiderV2", () => {
  layoutSiderTests.bind(this)(ThemedSiderV2, TestWrapper);
});
