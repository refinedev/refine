import { layoutSiderTests } from "@refinedev/ui-tests";

import { ThemedSiderV2 } from "./index";

describe("Sider", () => {
  layoutSiderTests.bind(this)(ThemedSiderV2);
});
