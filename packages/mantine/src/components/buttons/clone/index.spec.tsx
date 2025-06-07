import { buttonCloneTests } from "@refinedev/ui-tests";

import { CloneButton } from "./";
import { TestWrapper } from "@test/index";

describe("Clone Button", () => {
  buttonCloneTests.bind(this)(CloneButton, TestWrapper);
});
