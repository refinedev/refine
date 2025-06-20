import { buttonDeleteTests } from "@refinedev/ui-tests";
import { DeleteButton } from "./";

describe.skip("Delete Button", () => {
  buttonDeleteTests.bind(this)(DeleteButton);
});
