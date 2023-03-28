import { pageUpdatePasswordTests } from "@refinedev/ui-tests";
import { UpdatePasswordPage } from ".";

describe("Auth Page Forgot Password", () => {
    pageUpdatePasswordTests.bind(this)(UpdatePasswordPage);
});
