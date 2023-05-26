/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-advanced", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/posts/react-table");
    });

    it("the row should be expandable", () => {
        cy.getMaterialUILoadingCircular().should("not.exist");

        cy.get("#expanded-row").should("not.exist");

        cy.get("#expand-toggle").first().click();

        cy.get("#expanded-row").should("exist");
    });

    it("should select all rows when click the checkbox in the table header", () => {
        cy.getEditButton().should("exist");

        cy.get(".MuiTableCell-head input[type=checkbox]").click();

        cy.get("#row-select").each((checkbox) => {
            expect(checkbox).to.be.checked;
        });
    });

    it("should select the row when click the checkbox in the row", () => {
        cy.getEditButton().should("exist");

        cy.get("#row-select").first().click();

        cy.get("#row-select").first().should("be.checked");
    });

    it("delete button should only be showed when at least one row is selected", () => {
        cy.getEditButton().should("exist");

        cy.get("#delete-selected").should("not.exist");

        cy.get("#row-select").first().click();

        cy.get("#delete-selected").should("exist");
    });

    it("should fill the form with the row data when click the edit button and save the form", () => {
        cy.getEditButton().should("exist");

        cy.interceptGETPost();

        cy.getEditButton().first().click();

        cy.get(".MuiTableCell-root #title").should("exist");
        cy.get(".MuiTableCell-root .MuiSelect-nativeInput").should("exist");

        cy.wait("@getPost").then((interception) => {
            const { response } = interception;
            const data = response?.body;

            cy.get(".MuiTableCell-root #title").should(
                "have.value",
                data.title,
            );
            cy.get(".MuiTableCell-root .MuiSelect-nativeInput").should(
                "have.value",
                data.category.id,
            );
        });

        cy.get(".MuiTableCell-root #title")
            .clear()
            .type("Fuga eos enim autem eos.");

        cy.interceptPATCHPost();

        cy.getSaveButton().first().click();

        cy.wait("@patchPost").then((interception) => {
            const { request } = interception;
            const data = request.body;

            expect(data.title).to.equal("Fuga eos enim autem eos.");
        });
    });
});
