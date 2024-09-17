import { fieldTagTests } from "@refinedev/ui-tests";

import { TagField } from "./";
import { TestWrapper } from "@test";

describe("TagField", () => {
  fieldTagTests.bind(this)(TagField, TestWrapper);
});
