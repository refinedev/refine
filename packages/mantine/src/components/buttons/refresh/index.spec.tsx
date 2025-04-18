import { buttonRefreshTests } from "@refinedev/ui-tests";
import { RefreshButton } from "./";
import { TestWrapper } from "@test/index";

describe("Refresh Button", () => {
  buttonRefreshTests.bind(this)(RefreshButton, TestWrapper);
});
