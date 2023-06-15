/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-mantine-mutation-mode", () => {
    const BASE_URL = "http://localhost:5173";

    const mockPost = {
        title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
        content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        status: "draft",
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
    };

    const submitForm = () => {
        return cy.getSaveButton().click();
    };

    const changeMutationMode = (
        mode: "pessimistic" | "optimistic" | "undoable",
    ) => {
        // uppercase first letter
        const uppercaseMode = mode.charAt(0).toUpperCase() + mode.slice(1);

        return cy.get(`.mantine-Radio-label`).contains(uppercaseMode).click({
            force: true,
        });
    };

    const waitForLoading = () => {
        cy.getMantineLoadingOverlay().should("not.exist");
        cy.getSaveButton().should("not.be.disabled");
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
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();
        cy.wait("@getBlogPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            // wait loading state and render to be finished
            waitForLoading();

            cy.get("#title").should("have.value", body?.title);
            cy.get("#content textarea").should("have.value", body?.content);
        });
        fillForm();
        submitForm();
        cy.wait("@patchBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getMantineNotification().contains(/success/gi);
            // should redirect to list page
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });

    it("should edit record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        waitForLoading();
        fillForm();
        submitForm();
        // should redirect to list page
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
        cy.getMantineNotification().contains(/seconds to undo/gi);
        cy.getMantineNotification()
            .contains("seconds to undo", { timeout: 10000 })
            .should("not.exist");
        cy.wait("@patchBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getMantineNotification().contains(/success/gi);
        });
    });

    it("should undo editing when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.wait("@getCategories");
        waitForLoading();
        submitForm();
        // should redirect to list page
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
        cy.getMantineNotification()
            .contains(/seconds to undo/gi)
            .parent()
            .siblings("button")
            .click({ force: true });
        cy.getMantineNotification().should("not.exist");
        cy.get("@patchBlogPost").should("be.null");
    });

    it("should create a record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.getCreateButton().click();

        // wait loading state and render to be finished
        waitForLoading();
        fillForm();
        submitForm();

        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });

        cy.wait("@postBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getMantineNotification().contains(/success/gi);
        });
    });

    it("should edit a record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        waitForLoading();
        fillForm();
        submitForm();

        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });

        cy.wait("@patchBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getMantineNotification().contains(/success/gi);
        });
    });

    it("should delete record when mutation mode is pessimistic", () => {
        changeMutationMode("pessimistic");
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        waitForLoading();
        cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();

        cy.wait("@deleteBlogPost").then((interception) => {
            const response = interception?.response;

            expect(response?.statusCode).to.eq(200);
            cy.getMantineNotification().contains(/success/gi);
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });

    it("should delete record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        waitForLoading();
        cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();
        // should show notification
        cy.getMantineNotification().contains(/seconds to undo/gi);
        // notification should disappear after certain time
        cy.getMantineNotification()
            .contains("seconds to undo", { timeout: 10000 })
            .should("not.exist");
        // should sent a PATCH request after certain time
        cy.wait("@deleteBlogPost").then((interception) => {
            const response = interception?.response;

            expect(response?.statusCode).to.eq(200);
            cy.getMantineNotification().contains(/success/gi);
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });

    it("should undo deleting record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        waitForLoading();
        cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();
        cy.getDeleteButton().should("be.disabled");
        // should show notification
        cy.getMantineNotification().contains(/seconds to undo/gi);
        // click undo button
        cy.getMantineNotification()
            .contains(/seconds to undo/gi)
            .parent()
            .siblings("button")
            .click();
        cy.getDeleteButton().should("not.be.disabled");
        cy.get("@deleteBlogPost").should("be.null");
    });

    it("should delete record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        waitForLoading();
        cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();
        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
        // should sent a DELETE request after certain time
        cy.wait("@deleteBlogPost").then((interception) => {
            const response = interception?.response;
            expect(response?.statusCode).to.eq(200);
            cy.getMantineNotification().contains(/success/gi);
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });
});
