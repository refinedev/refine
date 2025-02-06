import { layoutTitleTests } from "@refinedev/ui-tests";
import { ThemedTitleV2 } from "./index";
import { TestWrapper } from "@test/index";

describe("ThemedTitleV2", () => {
  layoutTitleTests.bind(this)(ThemedTitleV2, TestWrapper);
});
