/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-data-grid-pro", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work with sorter", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _sort: "title",
          _order: "desc",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getDescPosts");

    cy.getMaterialUIColumnHeader(2).click();

    cy.url().should(
      "include",
      "sorters[0][field]=title&sorters[0][order]=desc",
    );

    cy.wait("@getDescPosts");

    cy.interceptGETPosts();

    cy.getMaterialUIColumnHeader(2).click();

    cy.url().should(
      "not.include",
      "sorters[0][field]=title&sorters[0][order]=desc",
    );

    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;
      const { _sort, _order } = request.query;

      expect(_sort).to.undefined;
      expect(_order).to.undefined;
    });

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _sort: "title",
          _order: "asc",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getAscPosts");

    cy.getMaterialUIColumnHeader(2).click();

    cy.url().should("include", "sorters[0][field]=title&sorters[0][order]=asc");

    cy.wait("@getAscPosts", { timeout: 120000 });
  });

  it("should work with filter", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.getMaterialUIColumnHeader(2).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );

    cy.get(".MuiList-root").children().eq(7).click();

    cy.contains("Filter").click();

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

    cy.get("[placeholder='Filter value']").eq(1).clear().type("lorem");

    cy.url().should(
      "include",
      "filters[1][field]=title&filters[1][value]=lorem&filters[1][operator]=contains",
    );

    cy.wait("@getFilteredPosts");
  });
});
