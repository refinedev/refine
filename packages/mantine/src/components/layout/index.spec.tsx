import { layoutLayoutTests } from "@refinedev/ui-tests";
import { Layout } from "./index";
import { TestWrapper } from "@test/index";

describe("Layout", () => {
  layoutLayoutTests.bind(this)(Layout, TestWrapper);
});
