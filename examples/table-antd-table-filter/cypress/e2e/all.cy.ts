/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-antd-table-filter", () => {
    beforeEach(() => {
        cy.interceptGETBlogPosts();
        cy.interceptGETBlogPosts();
        cy.interceptGETCategories();
        cy.visit("http://localhost:3000");
        cy.wait("@getBlogPosts");
        cy.wait("@getBlogPosts");
        cy.wait("@getCategories");
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("the table should be filterable by form", () => {
        cy.getAntdLoadingOverlay().should("not.exist");
        cy.interceptGETCategories().wait("@getCategories");

        cy.get("#q").type("lorem");
        cy.setAntdDropdown({ id: "category", selectIndex: 1 });
        cy.setAntdSelect({ id: "status", value: "Published" });
        cy.setAntdRangeDatePickerToToday({ id: "createdAt" });

        cy.interceptGETBlogPosts();
        cy.get("button[type=submit]").click();

        cy.wait("@getBlogPosts").then((interception) => {
            const { query } = interception.request;

            expect(query.q).to.equal("lorem");
            expect(query.status).to.equal("published");
            expect(query["category.id"]).not.to.be.undefined;
            expect(query["createdAt_gte"]).to.contain(
                new Date().toISOString().slice(0, 10),
            );
            expect(query["createdAt_lte"]).to.contain(
                new Date().toISOString().slice(0, 10),
            );
        });
    });
});
