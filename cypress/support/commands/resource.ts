/// <reference types="cypress" />

export const list = () => {
    cy.url().should("include", "/posts");
    cy.get(".refine-pageHeader-title").should("contain", "Posts");
};

export const create = () => {
    cy.getCreateButton().click();
    cy.url().should("include", "/posts/create");
    // TODO: Fill all form fields and submit
};

export const edit = () => {
    cy.get(".refine-edit-button").first().click();
    cy.url().should("include", "/posts/edit");
    // TODO: Update form fields and submit
};

export const show = () => {
    cy.get(".refine-show-button").first().click();
    cy.url().should("include", "/posts/show");
    // TODO: Check if all fields are visible (title,category,status ..etc)
};
