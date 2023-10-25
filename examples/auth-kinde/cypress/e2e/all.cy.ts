/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-kinde", () => {
    const BASE_URL = "http://localhost:5173";

    const login = () => {
        cy.get("button")
            .contains(/sign in/i)
            .click();

        cy.fixture("kinde-credentials").then((auth) => {
            cy.get("[name=p_email]").type(auth.email);
        });

        cy.get("button[type=submit]")
            .contains("Continue")
            .click({ force: true });

        cy.fixture("kinde-credentials").then((auth) => {
            cy.get("[name=p_password]").type(auth.password);
        });

        cy.get("button[type=submit]")
            .contains("Continue")
            .click({ force: true });
    };

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit(BASE_URL);
    });

    describe("login", () => {
        it("should login", () => {
            login();
            cy.location("pathname").should("eq", "/posts");
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
            cy.reload().then(() => {
                cy.location("pathname").should("eq", "/login");
                cy.location("search").should("contains", "?to=%2Ftest-route");
            });
        });
    });

    describe("logout", () => {
        it("should logout", () => {
            cy.location("pathname").should("eq", "/login");
            login();
            cy.location("pathname").should("eq", "/posts");
            cy.get(".ant-menu-title-content")
                .contains(/logout/i)
                .click();
            cy.location("pathname").should("eq", "/login");
        });
    });

    describe("get user identity", () => {
        it("should render getIdentity response on header", () => {
            login();
            cy.fixture("kinde-credentials").then((auth) => {
                cy.get(".ant-typography").contains(auth.name);
            });
        });
    });
});
