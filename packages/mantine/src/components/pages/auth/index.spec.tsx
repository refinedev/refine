import { authPageTests } from "@refinedev/ui-tests";
import { AuthPage } from ".";
import { TestWrapper } from "@test/index";

describe("Auth Page", () => {
  authPageTests.bind(this)(AuthPage, TestWrapper);
});
