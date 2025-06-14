import { buttonImportTests } from "@refinedev/ui-tests";

import { ImportButton } from "./";
import { TestWrapper } from "@test/index";

describe("ImportButton", () => {
  buttonImportTests.bind(this)(ImportButton, TestWrapper);
});
