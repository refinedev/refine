/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-cursor-pagination", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work with pagination", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept({
      url: "https://api.github.com/repos/refinedev/refine/commits*",
      query: {
        per_page: "5",
      },
    }).as("getSecondPageCommits");

    cy.get("[title='Go to next page']").click();

    cy.url().should("include", "current=2");

    cy.wait("@getSecondPageCommits");

    cy.intercept({
      url: "https://api.github.com/repos/refinedev/refine/commits*",
      query: {
        per_page: "5",
      },
    }).as("getFirstPageCommits");

    cy.get("[title='Go to previous page']").click();

    cy.url().should("include", "current=1");

    cy.wait("@getFirstPageCommits");
  });
});
