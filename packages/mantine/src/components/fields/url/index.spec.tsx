import { fieldUrlTests } from "@refinedev/ui-tests";

import { UrlField } from "./";
import { TestWrapper } from "@test";

describe("UrlField", () => {
  fieldUrlTests.bind(this)(UrlField, TestWrapper);
});
