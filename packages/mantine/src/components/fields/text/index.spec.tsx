import { fieldTextTests } from "@refinedev/ui-tests";

import { TextField } from "./";
import { TestWrapper } from "@test/index";

describe("TextField", () => {
  fieldTextTests.bind(this)(TextField, TestWrapper);
});
