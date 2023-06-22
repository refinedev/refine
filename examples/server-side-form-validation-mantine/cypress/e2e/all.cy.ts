/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("server-side-form-validation-mantine", () => {
    const BASE_URL = "http://localhost:5173";

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();

        cy.interceptGETCategories();
        cy.interceptGETPosts();
        cy.visit(BASE_URL);
    });

    it("should render edit form errors ", () => {
        cy.interceptGETPost();

        cy.wait("@getPosts");
        cy.getMantineLoadingOverlay().should("not.exist");
        cy.wait("@getCategories");

        cy.getEditButton().first().click();
        cy.wait("@getPost");
        cy.wait("@getCategories");
        cy.getMantineLoadingOverlay().should("not.exist");
        cy.getSaveButton().should("not.be.disabled");

        cy.getSaveButton().click();

        cy.contains("Title is required");
        cy.contains("Category is required");
        cy.contains("Content is required");
        cy.contains("Tags is required");
        cy.contains("Status is required");
    });

    it("should render create form errors ", () => {
        cy.wait("@getPosts");
        cy.getMantineLoadingOverlay().should("not.exist");
        cy.wait("@getCategories");

        cy.getCreateButton().click();
        cy.wait("@getCategories");
        cy.getMantineLoadingOverlay().should("not.exist");
        cy.getSaveButton().should("not.be.disabled");

        cy.getSaveButton().click();

        cy.contains("Title is required");
        cy.contains("Category is required");
        cy.contains("Content is required");
        cy.contains("Tags is required");
        cy.contains("Status is required");
    });
});
