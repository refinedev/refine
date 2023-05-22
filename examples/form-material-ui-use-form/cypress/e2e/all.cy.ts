/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-material-ui-use-form", () => {
    const BASE_URL = "http://localhost:3000";

    const mockPost = {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        status: "published",
    };

    const fillForm = () => {
        cy.get("#title").clear();
        cy.get("#title").type(mockPost.title);
        cy.get("#content").clear();
        cy.get("#content").type(mockPost.content);
        cy.get("#status").click();
        cy.get("#status-option-0").click();
        cy.get("#category").click();
        cy.get("#category-option-0").click();
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

        cy.getMaterialUINotification().contains(/success/i);
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

        // wait loading state and render to be finished
        cy.wait("@getPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            expect(response?.statusCode).to.eq(200);
            // assert form values are filled with record data
            cy.get("#title").should("have.value", body?.title);
            cy.get("#content").should("have.value", body?.content);
            cy.get("#status").should("have.value", body?.status);
        });

        cy.getSaveButton().should("not.be.disabled");
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

        cy.getDeleteButton()
            .first()
            .click()
            .getMaterialUIDeletePopoverButton()
            .click();

        cy.wait("@deletePost").then((interception) => {
            const response = interception?.response;

            expect(response?.statusCode).to.eq(200);
            cy.getMaterialUINotification().should("contain", "Success");
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/posts");
            });
        });
    });

    it("should create form render errors", () => {
        cy.getCreateButton().click();

        submitForm();

        cy.getMaterialUIFormItemError({ id: "title" }).contains(/required/gi);
        cy.getMaterialUIFormItemError({ id: "status" }).contains(/required/gi);
        cy.getMaterialUIFormItemError({ id: "category" }).contains(
            /required/gi,
        );
        cy.getMaterialUIFormItemError({ id: "content" }).contains(/required/gi);

        fillForm();

        cy.getMaterialUIFormItemError({ id: "title" }).should("not.exist");
        cy.getMaterialUIFormItemError({ id: "status" }).should("not.exist");
        cy.getMaterialUIFormItemError({ id: "content" }).should("not.exist");
        cy.getMaterialUIFormItemError({ id: "category" }).should("not.exist");
    });

    it("should edit form render errors", () => {
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getPost");
        cy.getSaveButton().should("not.be.disabled");

        cy.get("#title").should("not.have.value", "").clear();
        cy.get("#content").should("not.have.value", "").clear();
        cy.get("#status").should("not.have.value", "").clear({ force: true });
        cy.get("#category").should("not.have.value", "").clear({ force: true });

        submitForm();

        cy.getMaterialUIFormItemError({ id: "title" }).contains(/required/gi);
        cy.getMaterialUIFormItemError({ id: "content" }).contains(/required/gi);
        cy.getMaterialUIFormItemError({ id: "status" }).contains(/required/gi);
        cy.getMaterialUIFormItemError({ id: "category" }).contains(
            /required/gi,
        );

        fillForm();

        cy.getMaterialUIFormItemError({ id: "title" }).should("not.exist");
        cy.getMaterialUIFormItemError({ id: "content" }).should("not.exist");
    });
});
