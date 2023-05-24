/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-keycloak", () => {
    const BASE_URL = "http://localhost:3000";

    const authCredentials = {
        email: "refine",
        password: "refine",
    };

    const login = () => {
        cy.get("button")
            .contains(/sign in/i)
            .click();

        cy.get("#username").type(authCredentials.email);
        cy.get("#password").type(authCredentials.password);
        cy.get("[type=submit]").click();
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
        login();
        cy.get(".ant-menu-title-content")
            .contains(/logout/i)
            .click();
        cy.location("pathname").should("eq", "/login");
    });

    it("should redirect to /login if user not authenticated", () => {
        login();
        cy.visit(`${BASE_URL}/test-route`);
        cy.clearAllCookies();
        cy.reload();
        cy.location("pathname").should("eq", "/login");
        cy.location("search").should("contains", "?to=%2Ftest-route");
    });

    it("should render getIdentity response on header", () => {
        login();
        cy.get(".ant-typography").contains(authCredentials.email);
    });
});
