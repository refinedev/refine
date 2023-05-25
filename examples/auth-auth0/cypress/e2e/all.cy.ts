/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-antd", () => {
    const BASE_URL = "http://localhost:3000";

    const authCredentials = {
        email: "alicanerdurmaz@gmail.com",
        password: "HSruXfi8baXPR7b",
    };

    const login = () => {
        cy.get("button")
            .contains(/sign in/i)
            .click();

        cy.get("#username").type(authCredentials.email);
        cy.get("#password").type(authCredentials.password);
        cy.get("button[type=submit]")
            .contains(/continue$/i)
            .click({ force: true });
    };

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit(BASE_URL);
    });

    it("should login", () => {
        login();
        cy.location("pathname").should("eq", "/posts");
    });

    it("should logout", () => {
        cy.location("pathname").should("eq", "/login");
        login();
        cy.location("pathname").should("eq", "/posts");
        cy.get(".ant-menu-title-content")
            .contains(/logout/i)
            .click();
        cy.location("pathname").should("eq", "/login");
    });

    it("should redirect to /login if user not authenticated", () => {
        cy.location("pathname").should("eq", "/login");
        login();
        cy.location("pathname").should("eq", "/posts");
        cy.visit(`${BASE_URL}/test-route`);
        cy.get(".ant-result-404").should("exist");
        cy.clearAllCookies();
        cy.clearAllSessionStorage();
        cy.clearAllLocalStorage();
        cy.reload();
        cy.location("pathname").should("eq", "/login");
        cy.location("search").should("contains", "?to=%2Ftest-route");
    });

    it("should render getIdentity response on header", () => {
        login();
        cy.get(".ant-typography").contains(authCredentials.email);
        cy.get(".ant-avatar > img").should("have.attr", "src");
    });
});
