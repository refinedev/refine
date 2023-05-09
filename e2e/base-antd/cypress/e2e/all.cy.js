/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("build test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should build", () => {
        cy.get("#root").should("exist");
    });
});
