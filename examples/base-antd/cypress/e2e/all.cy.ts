/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("base-antd", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be redirect `posts` resource", () => {
        cy.url().should("include", "/posts");
        cy.get(".ant-page-header-heading-title > .ant-typography").should(
            "have.text",
            "Posts",
        );
    });

    it("should be create new post", () => {
        // click data-test-id="antd-create-button"
        cy.get("[data-test-id=create-post-button]").click();
        // should be redirect `posts/create` resource
        cy.url().should("include", "/posts/create");
        // should be title `Create Post`
        cy.get(".ant-page-header-heading-title > .ant-typography").should(
            "have.text",
            "Create Post",
        );
        // return back list page
        cy.get(".ant-page-header-back-button > .ant-btn").click();
    });

    it("should be edit post", () => {
        cy.get("[data-test-id=edit-post-button]").first().click();
        // should be redirect `posts/edit` resource
        cy.url().should("include", "/posts/edit");
        // should be title `Edit Post`
        cy.get(".ant-page-header-heading-title > .ant-typography").should(
            "have.text",
            "Edit Post",
        );
        // return back list page
        cy.get(".ant-page-header-back-button > .ant-btn").click();
    });

    it("should be show post", () => {
        cy.get("[data-test-id=show-post-button]").first().click();
        // should be redirect `posts/show` resource
        cy.url().should("include", "/posts/show");
        // should be title `Show Post`
        cy.get(".ant-page-header-heading-title > .ant-typography").should(
            "have.text",
            "Show Post",
        );
        // return back list page
        cy.get(".ant-page-header-back-button > .ant-btn").click();
    });
});
