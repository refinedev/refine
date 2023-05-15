/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-steps-form", () => {
    const BASE_URL = "http://localhost:3000";

    const mockPost = {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        status: "Published",
    };

    const fillForm = () => {
        cy.get("#title").clear().type(mockPost.title);
        cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
        cy.setAntdSelect({ id: "status", value: mockPost.status });
        cy.get(".ant-btn").contains(/next/gi).click();
        cy.get("#content textarea").clear().type(mockPost.content);
    };

    const assertSuccessResponse = (response: any) => {
        const body = response?.body;

        expect(response?.statusCode).to.eq(200);
        expect(body).to.have.property("id");
        expect(body).to.have.property("category");
        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);
        expect(body?.status?.toLowerCase()).to.eq(
            mockPost?.status?.toLowerCase(),
        );

        cy.getAntdNotification().should("contain", "Success");
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/posts");
        });
    };

    const submitForm = () => {
        return cy.get(".ant-btn").contains(/save/gi).click();
    };

    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should create a new record", () => {
        cy.intercept("POST", "/posts").as("createPost");

        cy.getCreateButton().click();
        fillForm();
        submitForm();

        cy.wait("@createPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should edit a record", () => {
        cy.intercept("GET", "/posts/*").as("getPost");
        cy.intercept("PATCH", "/posts/*").as("patchPost");

        cy.getEditButton().first().click();

        cy.wait("@getPost");
        cy.wait(500);

        fillForm();
        submitForm();

        cy.wait("@patchPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should preserve form data when navigating between steps", () => {
        cy.getCreateButton().click();

        cy.get(".ant-select-selection-item").should("not.exist");
        cy.get(`.ant-select-selection-item[title="${mockPost.status}"]`).should(
            "not.exist",
        );

        fillForm();
        cy.get(".ant-btn")
            .contains(/previous/gi)
            .click();

        cy.get("#title").should("have.value", mockPost.title);
        cy.get(".ant-select-selection-item").eq(0).should("exist");
        cy.get(`.ant-select-selection-item[title="${mockPost.status}"]`).should(
            "exist",
        );

        cy.get(".ant-btn").contains(/next/gi).click();

        cy.get("#content textarea").should("have.value", mockPost.content);
    });
});
