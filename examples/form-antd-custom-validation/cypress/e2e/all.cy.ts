/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-custom-validation", () => {
    const BASE_URL = "http://localhost:5173";

    const interceptUniqueCheck = (available: boolean) => {
        cy.intercept(
            {
                method: "GET",
                pathname: `/posts-unique-check`,
            },
            {
                body: {
                    isAvailable: available,
                },
            },
        ).as("uniqueCheck");
    };

    beforeEach(() => {
        cy.intercept(
            {
                method: "POST",
                pathname: "/posts",
            },
            {},
        ).as("postPost");

        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should render error", () => {
        interceptUniqueCheck(false);
        cy.visit(`${BASE_URL}/posts/create`);

        cy.get("#title").type("test title", { delay: 0 });
        cy.getSaveButton().click();

        cy.wait("@uniqueCheck");
        cy.getAntdFormItemError({ id: "title" }).contains(/unique/gi);
    });

    it("should not render error", () => {
        interceptUniqueCheck(true);
        cy.visit(`${BASE_URL}/posts/create`);

        cy.get("#title").type("test title", { delay: 0 });
        cy.getSaveButton().click();

        cy.wait("@uniqueCheck");
        cy.getAntdFormItemError({ id: "title" }).should("not.exist");
    });
});
