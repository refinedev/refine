/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-antd", () => {
    const BASE_URL = "http://localhost:5173";

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit(BASE_URL);
    });

    const submitAuthForm = () => {
        return cy.get("button[type=submit]").click();
    };

    const login = () => {
        cy.fixture("demo-auth-credentials").then((auth) => {
            cy.get("#email").clear();
            cy.get("#email").type(auth.email);
            cy.get("#password").clear();
            cy.get("#password").type(auth.password);
        });

        submitAuthForm();
    };

    describe("login", () => {
        it.skip("should login", () => {
            login();

            cy.location("pathname").should("eq", "/");
            cy.getAllLocalStorage().then((ls) => {
                expect(ls[BASE_URL]).to.have.property("email");
            });
        });

        it("should throw error if login email is wrong", () => {
            cy.get("#email").clear().type("test@test.com");
            cy.get("#password").clear().type("test");
            submitAuthForm();
            cy.getAntdNotification().contains(/login failed/i);
            cy.location("pathname").should("eq", "/login");
        });

        it.skip("should has 'to' param on URL after redirected to /login", () => {
            login();
            cy.location("pathname").should("eq", "/");

            cy.visit(`${BASE_URL}/test`);
            cy.location("pathname").should("eq", "/test");
            cy.clearAllLocalStorage();
            cy.reload();
            cy.location("search").should("contains", "to=%2Ftest");
            cy.location("pathname").should("eq", "/login");

            login();
            cy.location("pathname").should("eq", "/test");
        });

        it("should redirect to /login?to= if user not authenticated", () => {
            cy.visit(`${BASE_URL}/test-route`);
            cy.get(".ant-card-head-title > .ant-typography").contains(
                /sign in to your account/i,
            );
            cy.location("search").should("contains", "to=%2Ftest");
            cy.location("pathname").should("eq", "/login");
        });
    });

    describe("register", () => {
        it.skip("should register", () => {
            cy.get("a")
                .contains(/sign up/i)
                .click();
            cy.location("pathname").should("eq", "/register");
            login();
            cy.location("pathname").should("eq", "/");
            cy.getAllLocalStorage().then((ls) => {
                expect(ls[BASE_URL]).to.have.property("email");
            });
        });

        it("should throw error if register email is wrong", () => {
            cy.get("a")
                .contains(/sign up/i)
                .click();

            cy.get("#email").clear().type("test@test.com");
            cy.get("#password").clear().type("test");
            submitAuthForm();
            cy.getAntdNotification().contains(/invalid email/i);
            cy.location("pathname").should("eq", "/register");
        });
    });

    describe("forgot password", () => {
        it("should throw error if forgot password email is wrong", () => {
            cy.visit(`${BASE_URL}/forgot-password`);
            cy.get("#email").clear().type("test@test.com");
            submitAuthForm();
            cy.getAntdNotification().contains(/invalid email/i);
            cy.location("pathname").should("eq", "/forgot-password");
        });
    });

    describe("update password", () => {
        it("should throw error if update password is wrong", () => {
            cy.visit(`${BASE_URL}/update-password`);
            cy.get("#password").clear().type("123456");
            cy.get("#confirmPassword").clear().type("123456");
            submitAuthForm();
            cy.getAntdNotification().contains(/invalid password/i);
            cy.location("pathname").should("eq", "/update-password");

            cy.get("#password").clear().type("12345");
            cy.getAntdFormItemError({ id: "confirmPassword" }).contains(
                /do not match/i,
            );
        });
    });

    describe("logout", () => {
        it("should logout", () => {
            login();
            cy.get(".ant-menu-title-content")
                .contains(/logout/i)
                .click();
            cy.location("pathname").should("eq", "/login");
        });
    });

    describe("get identity", () => {
        it("should render getIdentity response on header", () => {
            login();
            cy.get(".ant-typography").contains(/jane doe/i);
            cy.get(".ant-avatar > img").should("have.attr", "src");
        });
    });
});
