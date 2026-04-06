/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-cursor-pagination", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work with pagination", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");
    cy.get(".MuiDataGrid-root").should("be.visible");
    cy.get(".MuiDataGrid-row").should("have.length.at.least", 1);

    cy.intercept({
      url: "https://api.github.com/repos/refinedev/refine/commits*",
      query: {
        per_page: "5",
      },
    }).as("getSecondPageCommits");

    cy.contains("button", "Next").should("not.be.disabled");
    cy.contains("button", "Next").click();

    cy.wait("@getSecondPageCommits");

    cy.intercept({
      url: "https://api.github.com/repos/refinedev/refine/commits*",
      query: {
        per_page: "5",
      },
    }).as("getFirstPageCommits");

    cy.contains("button", "Previous").should("not.be.disabled");
    cy.contains("button", "Previous").click();

    cy.wait("@getFirstPageCommits");
  });
});
