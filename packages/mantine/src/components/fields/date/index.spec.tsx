import { fieldDateTests } from "@refinedev/ui-tests";

import { DateField } from "./";
import { TestWrapper } from "@test/index";

describe("DateField", () => {
  fieldDateTests.bind(this)(DateField, TestWrapper);
});
