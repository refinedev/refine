import { layoutLayoutTests } from "@refinedev/ui-tests";
import { ThemedLayoutV2 } from "./index";
import { TestWrapper } from "@test/index";

describe("ThemedLayoutV2", () => {
  layoutLayoutTests.bind(this)(ThemedLayoutV2, TestWrapper);
});
