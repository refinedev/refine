/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
    return false;
});

describe("table-antd-advanced", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("the row should be expandable", () => {
        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.get(".ant-table-row-expand-icon").first().click();

        cy.get(".ant-table-expanded-row").first().should("exist");
    });

    it("should select all rows when click the checkbox in the table header", () => {
        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.get(".ant-table-thead .ant-checkbox-input").first().click();

        cy.get(".ant-table-row-selected").should("have.length", 10);
    });

    it("should select the row when click the checkbox in the row", () => {
        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.get(".ant-table-row .ant-checkbox-input").first().click();

        cy.get(".ant-table-row-selected").should("have.length", 1);
    });

    it("delete button should only be showed when at least one row is selected", () => {
        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.get(".ant-btn-dangerous").should("not.exist");

        cy.get(".ant-table-thead .ant-checkbox-input").first().click();

        cy.get(".ant-btn-dangerous").should("exist");
    });

    it("should fill the form with the row data when click the edit button and save the form", () => {
        cy.get(".ant-spin", { timeout: 10000 }).should("not.exist");

        cy.intercept("/posts/*").as("getPost");

        cy.get(".refine-edit-button").first().click();

        cy.get(".ant-input").should("exist");
        cy.get(".ant-select").should("exist");

        cy.wait("@getPost").then((interception) => {
            const { response } = interception;
            const data = response?.body;

            cy.get("#title").should("have.value", data.title);
        });

        cy.get("#title").clear().type("Fuga eos enim autem eos.");

        cy.intercept("PATCH", "/posts/*").as("updatePost");

        cy.get(".refine-save-button").first().click();

        cy.wait("@updatePost").then((interception) => {
            const { request } = interception;
            const data = request.body;

            expect(data.title).to.equal("Fuga eos enim autem eos.");
        });
    });

    it("expanded row should be display the table with the posts data", () => {
        cy.visit("http://localhost:3000/categories");

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
