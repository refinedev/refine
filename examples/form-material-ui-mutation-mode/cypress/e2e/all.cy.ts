/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-material-ui-mutation-mode", () => {
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
    };

    const submitForm = () => {
        return cy.getSaveButton().click();
    };

    const changeMutationMode = (
        mode: "pessimistic" | "optimistic" | "undoable",
    ) => {
        return cy
            .get(`input[type="radio"][value="${mode}"]`)
            .click({ force: true });
    };

    beforeEach(() => {
        cy.interceptGETBlogPost();
        cy.interceptPOSTBlogPost();
        cy.interceptPATCHBlogPost();
        cy.interceptDELETEBlogPost();
        cy.interceptGETBlogPosts();
        cy.interceptGETCategories();

        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();

        cy.visit(BASE_URL);
    });

    it("should edit record when mutation mode is pessimistic", () => {
        changeMutationMode("pessimistic");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            expect(response?.statusCode).to.eq(200);
            // assert form values are filled with record data
            cy.getSaveButton().should("not.be.disabled");
            cy.get("#title").should("have.value", body?.title);
            cy.get("#content").should("have.value", body?.content);
            cy.get("#status").should("have.value", body?.status);
        });

        fillForm();
        submitForm();

        cy.wait("@patchBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should edit record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.getEditButton().first().click();

        cy.wait("@getBlogPost").then((interception) => {
            const getResponse = interception?.response;
            const body = getResponse?.body;

            // assert form values are filled with record data
            cy.getSaveButton().should("not.be.disabled");
            cy.get("#title").should("have.value", body?.title);
            cy.get("#content").should("have.value", body?.content);
            cy.get("#status").should("have.value", body?.status);
        });

        fillForm();
        submitForm();

        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
        // should show notification
        cy.getMaterialUINotification().contains(/seconds to undo/gi);
        // notification should disappear after certain time
        cy.getMaterialUINotification()
            .contains("seconds to undo", { timeout: 10000 })
            .should("not.exist");

        // should sent a PATCH request after certain time
        cy.wait("@patchBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getMaterialUINotification().contains(/success/i);
        });
    });

    it("should undo editing when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.getSaveButton().should("not.be.disabled");
        submitForm();
        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
        cy.get(".SnackbarItem-action > button").click();
        cy.getMaterialUINotification().should("not.exist");
        cy.get("@patchBlogPost").should("be.null");
    });

    it("should create record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.getCreateButton().click();

        fillForm();
        submitForm();

        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });

        // should sent a POST request after certain time
        cy.wait("@postBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getMaterialUINotification().contains(/success/i);
        });
    });

    it("should edit record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.getSaveButton().should("not.be.disabled");
        fillForm();
        submitForm();
        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
        // should sent a PATCH request after certain time
        cy.wait("@patchBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getMaterialUINotification().contains(/success/i);
        });
    });

    it("should delete record when mutation mode is pessimistic", () => {
        changeMutationMode("pessimistic");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.getSaveButton().should("not.be.disabled");

        cy.getDeleteButton()
            .first()
            .click()
            .getMaterialUIDeletePopoverButton()
            .click();

        // should sent a DELETE request after certain time
        cy.wait("@deleteBlogPost").then((interception) => {
            const response = interception?.response;

            expect(response?.statusCode).to.eq(200);
            cy.getMaterialUINotification().should("contain", "Success");
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });

    it("should delete record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.getSaveButton().should("not.be.disabled");

        cy.getDeleteButton()
            .first()
            .click()
            .getMaterialUIDeletePopoverButton()
            .click();
        // should show notification
        cy.getMaterialUINotification().contains(/seconds to undo/gi);
        // notification should disappear after certain time
        cy.getMaterialUINotification()
            .contains("seconds to undo", { timeout: 10000 })
            .should("not.exist");
        cy.wait("@deleteBlogPost").then((interception) => {
            const response = interception?.response;

            expect(response?.statusCode).to.eq(200);
            cy.getMaterialUINotification().should("contain", "Success");
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });

    it("should undo deleting record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.getSaveButton().should("not.be.disabled");

        cy.getDeleteButton()
            .first()
            .click()
            .getMaterialUIDeletePopoverButton()
            .click();
        cy.get(".SnackbarItem-action > button").click();
        cy.getMaterialUINotification().should("not.exist");
        cy.get("@deleteBlogPost").should("be.null");
    });

    it("should delete record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.getSaveButton().should("not.be.disabled");

        cy.getDeleteButton()
            .first()
            .click()
            .getMaterialUIDeletePopoverButton()
            .click();

        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
        cy.wait("@deleteBlogPost").then((interception) => {
            const response = interception?.response;
            expect(response?.statusCode).to.eq(200);
            cy.getMaterialUINotification().should("contain", "Success");
        });
    });
});
