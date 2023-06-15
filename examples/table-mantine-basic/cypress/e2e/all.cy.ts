/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-mantine-basic", () => {
    beforeEach(() => {
        cy.interceptGETBlogPosts();

        cy.visit("http://localhost:5173");
    });

    it("should work with sorter", () => {
        cy.wait("@getBlogPosts");

        cy.intercept(
            {
                url: "/blog_posts*",
                query: {
                    _sort: "id",
                    _order: "desc",
                },
            },
            {
                fixture: "blog-posts.json",
            },
        ).as("getDescPosts");

        cy.get(".icon-tabler-selector").first().click();

        cy.url().should(
            "include",
            "sorters[0][field]=id&sorters[0][order]=desc",
        );

        cy.wait("@getDescPosts");

        cy.intercept(
            {
                url: "/blog_posts*",
                query: {
                    _sort: "id",
                    _order: "asc",
                },
            },
            {
                fixture: "blog-posts.json",
            },
        ).as("getAscPosts");

        cy.get(".icon-tabler-chevron-down").first().click();

        cy.url().should(
            "include",
            "sorters[0][field]=id&sorters[0][order]=asc",
        );

        cy.wait("@getAscPosts");

        cy.interceptGETBlogPosts();

        cy.get(".icon-tabler-chevron-down").first().click();

        cy.url().should(
            "not.include",
            "sorters[0][field]=id&sorters[0][order]=desc",
        );

        cy.wait("@getBlogPosts").then((interception) => {
            const { request } = interception;
            const { _sort } = request.query;

            expect(_sort).not.to.contains("id");
        });
    });

    it("should work with filter", () => {
        cy.wait("@getBlogPosts");

        cy.intercept(
            {
                url: "/blog_posts*",
                query: {
                    title_like: "lorem",
                },
            },
            {
                fixture: "blog-posts.json",
            },
        ).as("getFilteredPosts");

        cy.get(".icon-tabler-filter").eq(1).click();
        cy.get("#title").type("lorem");
        cy.get(".icon-tabler-check").click();

        cy.url().should(
            "include",
            `filters[1][field]=title&filters[1][operator]=contains&filters[1][value]=lorem`,
        );

        cy.wait("@getFilteredPosts");
    });

    it("should work with pagination", () => {
        cy.wait("@getBlogPosts");

        cy.get(".mantine-Pagination-item").contains("2").click();

        cy.url().should("include", "current=2");

        cy.wait("@getBlogPosts").then((interception) => {
            const { request } = interception;
            const { _start, _end } = request.query;

            expect(_start).to.equal("10");
            expect(_end).to.equal("20");
        });

        cy.get(".mantine-Pagination-item").contains("1").click();

        cy.url().should("include", "current=1");

        cy.wait("@getBlogPosts").then((interception) => {
            const { request } = interception;
            const { _start, _end } = request.query;

            expect(_start).to.equal("0");
            expect(_end).to.equal("10");
        });
    });

    it("should set current `1` when filter changed", () => {
        cy.wait("@getBlogPosts");

        cy.get(".mantine-Pagination-item").contains("2").click();

        cy.get(".icon-tabler-filter").eq(1).click();
        cy.get("#title").type("lorem");
        cy.get(".icon-tabler-check").click();

        cy.url().should("include", "current=1");
    });
});
