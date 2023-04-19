import { layoutHeaderTests } from "@refinedev/ui-tests";

import { ThemedHeaderV2 } from "./index";

describe("Header", () => {
    layoutHeaderTests.bind(this)(ThemedHeaderV2);
});
