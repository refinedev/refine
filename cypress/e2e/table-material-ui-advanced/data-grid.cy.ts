/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-advanced", () => {
  beforeEach(() => {
    cy.interceptGETPosts();
    cy.interceptGETCategories();
    cy.visit("/posts/data-grid");
  });

  it("should work with filter", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.getMaterialUIColumnHeader(2).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );

    cy.get(".MuiDataGrid-menu > div > .MuiList-root").children().eq(3).click();

    cy.intercept(
      {
        url: "/posts*",
        query: {
          title_like: "lorem",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getFilteredPosts");

    cy.get("[placeholder='Filter value']").type("lorem");

    cy.url().should(
      "include",
      "filters[0][field]=title&filters[0][value]=lorem&filters[0][operator]=contains",
    );

    cy.wait("@getFilteredPosts");
  });
});
