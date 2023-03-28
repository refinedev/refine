import { pageLoginTests } from "@refinedev/ui-tests";
import { LoginPage } from ".";

describe("Auth Page Forgot Password", () => {
    pageLoginTests.bind(this)(LoginPage);
});
