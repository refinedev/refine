import { autoSaveIndicatorTests } from "@refinedev/ui-tests";

import { AutoSaveIndicator } from "./";
import { TestWrapper } from "@test/index";

describe("AutoSaveIndicator", () => {
  autoSaveIndicatorTests.bind(this)(AutoSaveIndicator, TestWrapper);
});
