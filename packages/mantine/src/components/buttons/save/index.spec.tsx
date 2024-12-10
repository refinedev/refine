import { buttonSaveTests } from "@refinedev/ui-tests";
import { SaveButton } from "./";
import { TestWrapper } from "@test/index";

describe("Save Button", () => {
  buttonSaveTests.bind(this)(SaveButton, TestWrapper);
});
