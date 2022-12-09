import { exactMatchRegexp } from "../integration/utils";

describe("Show", () => {
    beforeEach(() => {
        cy.visit("/posts");

        cy.intercept("GET", "/categories?id=*").as("getCategory");
        cy.intercept("GET", "/categories/*").as("getCategories");
        cy.intercept("GET", "/posts/*").as("getPost");

        cy.get(".ant-table-row")
            .first()
            .find("button.ant-btn")
            .contains(exactMatchRegexp("Show"))
            .click();
    });

    it("render record data correctly upon navigation to show page from list with show button", () => {
        cy.wait("@getCategories");

        cy.wait("@getPost").then((postRes) => {
            const { title, content, id } = postRes.response.body;

            cy.get(".ant-card-body").within(() => {
                cy.contains(exactMatchRegexp(id));
                cy.contains(exactMatchRegexp(title));
                cy.contains(content);

                cy.contains(exactMatchRegexp("Category"))
                    .siblings("span.ant-typography")
                    .should("not.be.empty");
            });
        });
    });
});
