import { layoutSiderTests } from "@refinedev/ui-tests";

import { ThemedSider } from "./index";

describe.skip("Sider", () => {
  layoutSiderTests.bind(this)(ThemedSider);
});
