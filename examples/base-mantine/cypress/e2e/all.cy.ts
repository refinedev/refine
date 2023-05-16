/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("base-mantine", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("should be create page", () => {
        cy.resourceCreate();
    });

    it("should be edit page", () => {
        cy.resourceEdit();
    });

    it("should be show page", () => {
        cy.resourceShow();
    });
});
