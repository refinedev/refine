import { fieldFileTests } from "@refinedev/ui-tests";

import { FileField } from "./";
import { TestWrapper } from "@test";

describe("FileField", () => {
  fieldFileTests.bind(this)(FileField, TestWrapper);
});
