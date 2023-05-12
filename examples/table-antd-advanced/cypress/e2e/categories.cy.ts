/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("table-antd-advanced", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/categories");
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it.only("expanded row should be display the table with the posts data", () => {
        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.intercept("/posts*").as("getPosts");

        cy.get(".ant-table-row-expand-icon").first().click();

        cy.get(".ant-table-expanded-row").first().should("exist");

        cy.wait("@getPosts").then((interception) => {
            const { response } = interception;
            const data = response?.body;

            const ids = data.map((item) => item.id);
            const rows = cy.get(".ant-table-expanded-row .ant-table-row");

            rows.each((row, index) => {
                const id = ids[index];

                cy.wrap(row).should("contain", id);
            });

            const categoriyIds = data.map((item) => item.category.id);

            //All category ids should be the same
            expect(categoriyIds.every((val, i, arr) => val === arr[0])).to.be
                .true;
        });
    });
});
