import { buttonCreateTests } from "@refinedev/ui-tests";

import { CreateButton } from "./";
import { TestWrapper } from "@test/index";

describe("Create Button", () => {
  buttonCreateTests.bind(this)(CreateButton, TestWrapper);
});
