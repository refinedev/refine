import { buttonExportTests } from "@refinedev/ui-tests";
import { ExportButton } from "./index";
import { TestWrapper } from "@test";

describe("<ExportButton/>", () => {
  buttonExportTests.bind(this)(ExportButton, TestWrapper);
});
