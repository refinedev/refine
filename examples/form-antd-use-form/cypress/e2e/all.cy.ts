/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-form", () => {
    const BASE_URL = "http://localhost:3000";

    const mockPost = {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        status: "Published",
    };

    const fillForm = () => {
        cy.get("#title").clear().type(mockPost.title);
        cy.get("#content textarea").clear().type(mockPost.content);
        cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
        cy.setAntdSelect({ id: "status", value: mockPost.status });
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
        return cy.getSaveButton().click();
    };

    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should create, edit, and, delete record", () => {
        cy.intercept("GET", "/posts/*").as("getPost");
        cy.intercept("POST", "/posts").as("createPost");
        cy.intercept("PATCH", "/posts/*").as("patchPost");
        cy.intercept("DELETE", "/posts/*").as("deletePost");

        cy.getCreateButton().click();

        fillForm();
        submitForm();

        cy.wait("@createPost").then((interception) => {
            const response = interception?.response;
            const recordId = response?.body?.id;
            assertSuccessResponse(response);

            //visit edit page to `EDIT` the record
            cy.visit(`${BASE_URL}/posts/edit/${recordId}`);
            cy.wait("@getPost").then((getInterception) => {
                const getResponse = getInterception?.response;
                const body = getResponse?.body;
                expect(getResponse?.statusCode).to.eq(200);

                // wait loading state and render to be finished
                cy.getSaveButton().should("not.be.disabled");
                cy.getAntdLoadingOverlay().should("not.exist");

                cy.get("#title").should("have.value", body?.title);
                cy.get("#content textarea").should("have.value", body?.content);

                fillForm();
                submitForm();
                cy.wait("@patchPost").then((interception) => {
                    const response = interception?.response;
                    assertSuccessResponse(response);
                });
            });

            //visit edit page to `DELETE` the record
            cy.visit(`${BASE_URL}/posts/edit/${recordId}`);
            cy.wait("@getPost").then((getInterception) => {
                const getResponse = getInterception?.response;
                expect(getResponse?.statusCode).to.eq(200);

                // wait loading state and render to be finished
                cy.getSaveButton().should("not.be.disabled");
                cy.getAntdLoadingOverlay().should("not.exist");

                cy.getDeleteButton()
                    .click()
                    .getAntdPopoverDeleteButton()
                    .click();
                cy.wait("@deletePost").then((interception) => {
                    const response = interception?.response;

                    expect(response?.statusCode).to.eq(200);
                    cy.getAntdNotification().should("contain", "Success");
                    cy.location().should((loc) => {
                        expect(loc.pathname).to.eq("/posts");
                    });
                });
            });
        });
    });

    it("should create form render errors", () => {
        cy.getCreateButton().click();

        submitForm();
        cy.getAntdFormItemError({ id: "title" }).contains(
            /please enter title/gi,
        );
        cy.getAntdFormItemError({ id: "content" }).contains(
            /please enter content/gi,
        );
        cy.getAntdFormItemError({ id: "category_id" }).contains(
            /please enter category/gi,
        );
        cy.getAntdFormItemError({ id: "status" }).contains(
            /please enter status/gi,
        );

        fillForm();

        cy.getAntdFormItemError({ id: "title" }).should("not.exist");
        cy.getAntdFormItemError({ id: "content" }).should("not.exist");
        cy.getAntdFormItemError({ id: "category_id" }).should("not.exist");
        cy.getAntdFormItemError({ id: "status" }).should("not.exist");
    });

    it("should edit form render errors", () => {
        cy.intercept("GET", "/posts/*").as("getPost");

        cy.visit(`${BASE_URL}/posts/edit/123`);

        cy.wait("@getPost");
        cy.wait(500);

        cy.get("#title").should("not.have.value", "").clear();
        cy.get("#content textarea").should("not.have.value", "").clear();

        cy.getAntdFormItemError({ id: "title" }).contains(
            /please enter title/gi,
        );
        cy.getAntdFormItemError({ id: "content" }).contains(
            /please enter content/gi,
        );

        fillForm();

        cy.getAntdFormItemError({ id: "title" }).should("not.exist");
        cy.getAntdFormItemError({ id: "content" }).should("not.exist");
    });
});
