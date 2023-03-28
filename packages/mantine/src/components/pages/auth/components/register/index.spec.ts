import { pageRegisterTests } from "@refinedev/ui-tests";
import { RegisterPage } from ".";

describe("Auth Page Forgot Password", () => {
    pageRegisterTests.bind(this)(RegisterPage);
});
