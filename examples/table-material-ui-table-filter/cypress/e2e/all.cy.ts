/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-table-filter", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("the table should be filterable by form", () => {
        cy.get("#q").type("lorem");
        cy.get("#status").click().get("#status-option-0").click();
        cy.get("#category")
            .click()
            .get("#category-option-0", { timeout: 3000 })
            .click();

        cy.interceptGETPosts();

        cy.get("button[type=submit]").click();

        cy.wait("@getPosts").then((interception) => {
            const { query } = interception.request;

            expect(query.q).to.equal("lorem");
            expect(query.status).to.equal("published");
            expect(query["category.id"]).not.to.be.undefined;
        });
    });
});
