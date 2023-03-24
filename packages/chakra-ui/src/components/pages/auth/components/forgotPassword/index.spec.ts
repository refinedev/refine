import { pageForgotPasswordTests } from "@refinedev/ui-tests";
import { ForgotPasswordPage } from ".";

describe("Auth Page Login", () => {
    pageForgotPasswordTests.bind(this)(ForgotPasswordPage);
});
