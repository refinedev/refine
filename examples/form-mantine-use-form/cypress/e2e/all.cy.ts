/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-mantine-use-form", () => {
    const BASE_URL = "http://localhost:5173";

    const mockPost = {
        title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
        content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        status: "Draft",
    };

    const fillForm = () => {
        cy.get("#title").clear().type(mockPost.title);
        cy.get("#content textarea")
            .clear({ force: true })
            .type(mockPost.content);
        cy.get("#status").click().get("#status-1").click();
        cy.get("#categoryId").clear().get("#categoryId-1").click();
    };

    const assertSuccessResponse = (response: any) => {
        const body = response?.body;

        expect(response?.statusCode).to.eq(200);
        expect(body).to.have.property("id");
        expect(body).to.have.property("category");
        expect(body?.title).to.eq(mockPost.title);
        expect(body?.status?.toLowerCase()).to.eq(
            mockPost?.status?.toLowerCase(),
        );

        cy.getMantineNotification().contains(/success/gi);
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/posts");
        });
    };

    const submitForm = () => {
        return cy.getSaveButton().click();
    };

    beforeEach(() => {
        cy.interceptGETPost();
        cy.interceptPOSTPost();
        cy.interceptPATCHPost();
        cy.interceptDELETEPost();
        cy.interceptGETPosts();
        cy.interceptGETCategories();

        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();

        cy.visit(BASE_URL);
    });

    it("should create record", () => {
        cy.getCreateButton().click();
        fillForm();
        submitForm();

        cy.wait("@postPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should edit record", () => {
        cy.getEditButton().first().click();

        cy.wait("@getPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            // wait loading state and render to be finished
            cy.getSaveButton().should("not.be.disabled");
            cy.getAntdLoadingOverlay().should("not.exist");

            cy.get("#title").should("have.value", body?.title);
            cy.get("#content textarea").should("have.value", body?.content);
            cy.getAntdLoadingOverlay().should("not.exist");
        });

        fillForm();
        submitForm();

        cy.wait("@patchPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should delete record", () => {
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getPost");
        cy.getSaveButton().should("not.be.disabled");
        cy.getAntdLoadingOverlay().should("not.exist");

        cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();

        cy.wait("@deletePost").then((interception) => {
            const response = interception?.response;

            expect(response?.statusCode).to.eq(200);
            cy.getMantineNotification().contains(/success/gi);
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/posts");
            });
        });
    });

    it("should create form render errors", () => {
        cy.getCreateButton().click();

        submitForm();

        cy.getMantineFormItemError({ id: "title" }).contains(/short/gi);
        cy.getMantineFormItemError({ id: "status" }).contains(/required/gi);
        cy.getMantineFormItemError({ id: "categoryId" }).contains(/required/gi);
        cy.get(".mantine-Text-root").contains(/too short content/i);
    });

    it("should edit form render errors", () => {
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getPost");
        cy.getSaveButton().should("not.be.disabled");
        cy.getAntdLoadingOverlay().should("not.exist");

        cy.get("#content textarea").clear();
        cy.get("#title").clear();
        cy.get("#categoryId").clear();

        submitForm();

        cy.getMantineFormItemError({ id: "title" }).contains(/short/gi);
        cy.getMantineFormItemError({ id: "categoryId" }).contains(/required/gi);
        cy.get(".mantine-Text-root").contains(/too short content/i);
    });
});
