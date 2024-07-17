/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-use-data-grid", () => {
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

  it("should work with pagination", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _start: "10",
          _end: "20",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getSecondPagePosts");

    cy.get("[title='Go to next page']").click();

    cy.url().should("include", "current=2");

    cy.wait("@getSecondPagePosts");

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _start: "0",
          _end: "10",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getFirstPagePosts");

    cy.get("[title='Go to previous page']").click();

    cy.url().should("include", "current=1");

    cy.wait("@getFirstPagePosts");
  });

  it("should set current `1` when filter changed", () => {
    cy.intercept(
      {
        url: "/posts*",
        query: {
          _start: "10",
          _end: "20",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getSecondPagePosts");

    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.get("[title='Go to next page']").click();

    cy.wait("@getSecondPagePosts");

    cy.getMaterialUIColumnHeader(2).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );

    cy.get(".MuiDataGrid-menu > div > .MuiList-root").children().eq(3).click();

    cy.get("[placeholder='Filter value']").type("lorem");

    cy.url().should("include", "current=1");
  });

  it("should update a cell", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept("/posts/*").as("patchRequest");

    cy.getMaterialUIColumnHeader(1).click();

    cy.get(".MuiDataGrid-cell").eq(1).dblclick();

    cy.get(
      ".MuiDataGrid-cell--editing > .MuiInputBase-root > .MuiInputBase-input",
    )
      .clear()
      .type("Lorem ipsum refine!")
      .type("{enter}");

    cy.wait("@patchRequest");

    cy.get(".MuiDataGrid-cell").eq(1).should("contain", "Lorem ipsum refine!");
  });

  it("should not update a cell", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept("PATCH", "/posts/*", (request) => {
      request.reply({
        statusCode: 500,
      });
    }).as("patchRequest");

    cy.getMaterialUIColumnHeader(1).click();

    cy.get(".MuiDataGrid-cell").eq(1).dblclick();

    cy.get(
      ".MuiDataGrid-cell--editing > .MuiInputBase-root > .MuiInputBase-input",
    )
      .clear()
      .type("Lorem ipsum fail!")
      .type("{enter}");

    cy.wait("@patchRequest");

    cy.get(".MuiDataGrid-cell")
      .eq(1)
      .should("not.contain", "Lorem ipsum fail!");
  });
});
