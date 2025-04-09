import { buttonDeleteTests } from "@refinedev/ui-tests";
import { DeleteButton } from "./";
import { TestWrapper } from "@test/index";

describe("Delete Button", () => {
  buttonDeleteTests.bind(this)(DeleteButton, TestWrapper);
});
