import { buttonEditTests } from "@refinedev/ui-tests";
import { EditButton } from "./";
import { TestWrapper } from "@test";

describe("Edit Button", () => {
  buttonEditTests.bind(this)(EditButton, TestWrapper);
});
