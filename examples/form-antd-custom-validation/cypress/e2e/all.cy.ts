/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-form", () => {
    const BASE_URL = "http://localhost:3000";

    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("should be create page", () => {
        cy.resourceCreate();
    });

    it("should be edit page", () => {
        cy.resourceEdit();
    });

    it.only("should render error", () => {
        // find first row and get title
        cy.get(".ant-table-row-level-0")
            .first()
            .find("td")
            .eq(1)
            .then((el) => {
                const title = el.text();

                // create record with title to check unique validation is working
                cy.getCreateButton().click();
                cy.get("#title")
                    .clear()
                    .type(title)
                    .then(() => {
                        cy.getAntdFormItemError({ id: "title" }).contains(
                            /unique/gi,
                        );
                    });
            });
    });
});
