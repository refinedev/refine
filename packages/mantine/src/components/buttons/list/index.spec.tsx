import { buttonListTests } from "@refinedev/ui-tests";
import { ListButton } from "./";
import { TestWrapper } from "@test/index";

describe("List Button", () => {
  buttonListTests.bind(this)(ListButton, TestWrapper);
});
