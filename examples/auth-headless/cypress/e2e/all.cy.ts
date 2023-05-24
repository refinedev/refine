/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-headless", () => {
    const BASE_URL = "http://localhost:3000";

    const submitAuthForm = () => {
        return cy.get("[type=submit]").click();
    };

    const login = () => {
        cy.get('input[name="email"]').clear().type("demo@refine.dev");
        cy.get('input[name="password"]').clear().type("demodemo");
        submitAuthForm();
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
        cy.getAllLocalStorage().then((ls) => {
            expect(ls[BASE_URL]).to.have.property("email");
        });
    });

    it("should register", () => {
        cy.get("a")
            .contains(/sign up/i)
            .click();
        cy.location("pathname").should("eq", "/register");
        login();
        cy.location("pathname").should("eq", "/posts");
        cy.getAllLocalStorage().then((ls) => {
            expect(ls[BASE_URL]).to.have.property("email");
        });
    });

    it("should logout", () => {
        login();
        cy.get("button")
            .contains(/logout/i)
            .click();
        cy.location("pathname").should("eq", "/login");
    });
});
