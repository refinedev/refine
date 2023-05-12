/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-custom-validation", () => {
    const BASE_URL = "http://localhost:3000";

    const mockPost = {
        title: [...Array(12)].map(() => Math.random().toString(36)[2]).join(""),
        content: "test content",
        status: "Published",
    };

    const fillForm = () => {
        cy.get("#title").clear().type(mockPost.title);
        cy.get("#content textarea").clear().type(mockPost.content);
        cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
        cy.setAntdSelect({ id: "status", value: mockPost.status });
    };

    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    // first create a record with a random title,
    // after that try to create a record with the same title to check unique title validation
    it("should render error", () => {
        cy.intercept("POST", "/posts").as("createPost");

        // create a record
        cy.getCreateButton().click();
        fillForm();
        cy.getSaveButton().click();

        // check if the record is created
        cy.wait("@createPost").then((interception) => {
            const response = interception?.response;
            expect(response?.statusCode).to.eq(200);
        });

        // try to create a record with the same title
        cy.getCreateButton().click();
        cy.get("#title")
            .clear()
            .type(mockPost.title)
            .then(() => {
                cy.getAntdFormItemError({ id: "title" }).contains(/unique/gi);
            });
    });
});
