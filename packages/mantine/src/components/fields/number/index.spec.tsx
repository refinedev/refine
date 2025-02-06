import { fieldNumberTests } from "@refinedev/ui-tests";

import { NumberField } from "./";
import { TestWrapper } from "@test";

describe("NumberField", () => {
  fieldNumberTests.bind(this)(NumberField, TestWrapper);
});
