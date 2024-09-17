import { fieldEmailTests } from "@refinedev/ui-tests";

import { EmailField } from "./";
import { TestWrapper } from "@test/index";

describe("EmailField", () => {
  fieldEmailTests.bind(this)(EmailField, TestWrapper);
});
