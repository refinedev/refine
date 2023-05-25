/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("base-antd", () => {
    const BASE_URL = "http://localhost:3000";

    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("should be create page", () => {
        cy.resourceCreate({
            ui: "antd",
        });
    });

    it("should be edit page", () => {
        cy.resourceEdit({ ui: "antd" });
    });

    it("should be show page", () => {
        cy.resourceShow();
    });
});
