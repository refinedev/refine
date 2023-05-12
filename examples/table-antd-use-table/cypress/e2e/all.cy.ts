/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("table-antd-use-table", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("should work with sorter", () => {
        cy.intercept({
            url: "/posts*",
            query: {
                _sort: "id",
                _order: "asc",
            },
        }).as("getAscPosts");
        cy.intercept({
            url: "/posts*",
            query: {
                _sort: "id",
                _order: "desc",
            },
        }).as("getDescPosts");

        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.get(".ant-table-column-sorters").first().click();

        cy.url().should(
            "include",
            "sorters[0][field]=id&sorters[0][order]=asc",
        );

        cy.wait("@getAscPosts").then((interception) => {
            const { request, response } = interception;

            const { _sort, _order } = request.query;
            const data = response?.body;

            const ids = data?.map((item) => item.id);
            const rows = cy.get(".ant-table-row");

            rows.each((row, index) => {
                const id = ids[index];

                cy.wrap(row).should("contain", id);
            });

            expect(_sort).to.equal("id");
            expect(_order).to.equal("asc");
        });

        cy.get(".ant-table-column-sorters").first().click();

        cy.url().should(
            "include",
            "sorters[0][field]=id&sorters[0][order]=desc",
        );

        cy.wait("@getDescPosts").then((interception) => {
            const { request, response } = interception;

            const { _sort, _order } = request.query;
            const data = response?.body;

            const ids = data?.map((item) => item.id);
            const rows = cy.get(".ant-table-row");

            rows.each((row, index) => {
                const id = ids[index];

                cy.wrap(row).should("contain", id);
            });

            expect(_sort).to.equal("id");
            expect(_order).to.equal("desc");
        });

        cy.intercept("GET", "/posts*").as("getPosts");

        cy.get(".ant-table-column-sorters").first().click();

        cy.url().should(
            "not.include",
            "sorters[0][field]=id&sorters[0][order]=desc",
        );

        cy.wait("@getPosts").then((interception) => {
            const { request } = interception;
            const { _sort, _order } = request.query;

            expect(_sort).to.undefined;
            expect(_order).to.undefined;
        });
    });

    it("should work with filter", () => {
        cy.intercept({
            url: "/posts*",
            query: {
                title_like: "lorem",
            },
        }).as("getFilteredPosts");

        cy.get(".ant-table-filter-trigger").first().click();

        cy.get(".ant-input").type("lorem");

        cy.get(".ant-btn-primary").click();

        cy.url().should(
            "include",
            `filters[2][field]=title&filters[2][operator]=contains&filters[2][value]=lorem`,
        );

        cy.wait("@getFilteredPosts").then((interception) => {
            const { request } = interception;

            const { title_like } = request.query;

            expect(title_like).to.equal("lorem");
        });
    });

    it("should work with pagination", () => {
        cy.intercept({
            url: "/posts*",
            query: {
                _start: "10",
                _end: "20",
            },
        }).as("getSecondPagePosts");

        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.get(".ant-pagination-item").first().next().click();

        cy.url().should("include", "current=2");

        cy.wait("@getSecondPagePosts").then((interception) => {
            const { request } = interception;

            const { _start, _end } = request.query;

            expect(_start).to.equal("10");
            expect(_end).to.equal("20");
        });

        cy.intercept({
            url: "/posts*",
            query: {
                _start: "0",
                _end: "10",
            },
        }).as("getFirstPagePosts");

        cy.get(".ant-pagination-prev").first().click();

        cy.url().should("include", "current=1");

        cy.wait("@getFirstPagePosts").then((interception) => {
            const { request } = interception;

            const { _start, _end } = request.query;

            expect(_start).to.equal("0");
            expect(_end).to.equal("10");
        });
    });

    it("should set current `1` when filter changed", () => {
        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.get(".ant-pagination-item").first().next().click();

        cy.get(".ant-table-filter-trigger").first().click();

        cy.get(".ant-input").type("lorem");

        cy.get(".ant-btn-primary").click();

        cy.url().should("include", "current=1");
    });
});
