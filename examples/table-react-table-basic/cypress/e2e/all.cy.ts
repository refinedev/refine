/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-react-table-basic", () => {
    beforeEach(() => {
        cy.interceptGETBlogPosts();

        cy.visit("http://localhost:3000");
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

        cy.get("thead th div").contains("ID").click();

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

        cy.get("thead th div").contains("ID").click();

        cy.url().should(
            "include",
            "sorters[0][field]=id&sorters[0][order]=asc",
        );

        cy.wait("@getAscPosts");

        cy.interceptGETBlogPosts();

        cy.get("thead th div").contains("ID").click();

        cy.url().should(
            "not.include",
            "sorters[0][field]=id&sorters[0][order]=desc",
        );

        cy.wait("@getBlogPosts").then((interception) => {
            const { request } = interception;
            const { _sort, _order } = request.query;

            expect(_sort).to.undefined;
            expect(_order).to.undefined;
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

        cy.get("#title").type("lorem");

        cy.url().should(
            "include",
            `filters[0][field]=title&filters[0][operator]=contains&filters[0][value]=lorem`,
        );

        cy.wait("@getFilteredPosts");
    });

    it("should work with pagination", () => {
        cy.wait("@getBlogPosts");

        cy.intercept(
            {
                url: "/blog_posts*",
                query: {
                    _start: "10",
                    _end: "20",
                },
            },
            {
                fixture: "blog-posts.json",
            },
        ).as("getSecondPagePosts");

        cy.get("#next-button").click();

        cy.url().should("include", "current=2");

        cy.wait("@getSecondPagePosts");

        cy.intercept(
            {
                url: "/blog_posts*",
                query: {
                    _start: "0",
                    _end: "10",
                },
            },
            {
                fixture: "blog-posts.json",
            },
        ).as("getFirstPagePosts");

        cy.get("#previous-button").click();

        cy.url().should("include", "current=1");

        cy.wait("@getFirstPagePosts");
    });

    it("should set current `1` when filter changed", () => {
        cy.wait("@getBlogPosts");

        cy.get("#next-button").click();

        cy.get("#title").type("lorem");

        cy.url().should("include", "current=1");
    });
});
