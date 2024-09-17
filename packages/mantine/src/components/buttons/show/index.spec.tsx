import { buttonShowTests } from "@refinedev/ui-tests";
import { ShowButton } from "./";
import { TestWrapper } from "@test/index";

describe("Show Button", () => {
  buttonShowTests.bind(this)(ShowButton, TestWrapper);
});
