/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-chakra-ui-mutation-mode", () => {
    const BASE_URL = "http://localhost:5173";

    const mockPost = {
        title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
        content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        status: "draft",
    };

    const fillForm = () => {
        cy.get("#title").clear().type(mockPost.title);
        cy.get("#status").select(mockPost.status);
        cy.get("#categoryId").select(2);
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
        return cy.get(`.chakra-radio__input[value=${mode}]`).click({
            force: true,
        });
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

        cy.wait("@getBlogPost").then((interception) => {
            const getResponse = interception?.response;
            const body = getResponse?.body;

            // wait loading state and render to be finished
            cy.getSaveButton().should("not.be.disabled");
            cy.getChakraUILoadingOverlay().should("not.exist");

            // assert response values are equal to the form values
            cy.get("#title").should("have.value", body?.title);
            cy.get("#status").should("have.value", body?.status);
            cy.get("#categoryId").should("have.value", body?.category?.id);

            fillForm();
            submitForm();

            cy.wait("@patchBlogPost").then((patchInterception) => {
                const patchResponse = patchInterception?.response;
                assertSuccessResponse(patchResponse);
            });
        });
    });

    it("should edit record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.getEditButton().first().click();

        cy.wait("@getBlogPost").then((interception) => {
            const getResponse = interception?.response;
            const body = getResponse?.body;

            // wait loading state and render to be finished
            cy.getSaveButton().should("not.be.disabled");
            cy.getChakraUILoadingOverlay().should("not.exist");

            // assert response values are equal to the form values
            cy.get("#title").should("have.value", body?.title);
            cy.get("#status").should("have.value", body?.status);
            cy.get("#categoryId").should("have.value", body?.category?.id);
        });

        fillForm();
        submitForm();

        // should show notification
        cy.getChakraUIToast().contains(/seconds to undo/gi);
        // notification should disappear after certain time
        cy.getChakraUIToast()
            .contains("seconds to undo", { timeout: 10000 })
            .should("not.exist");

        // should sent a PATCH request after certain time
        cy.wait("@patchBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should undo editing when mutation mode is undoable", () => {
        cy.wait("@getBlogPosts");
        cy.getEditButton().first().click();

        // wait loading state and render to be finished
        cy.wait("@getBlogPost");
        cy.getSaveButton().should("not.be.disabled");
        cy.getChakraUILoadingOverlay().should("not.exist");
        cy.wait("@getCategories");

        fillForm();
        submitForm();

        cy.getChakraUIToast()
            .contains(/seconds to undo/gi)
            .siblings("button")
            .click();
        cy.getChakraUIToast().should("not.exist");

        cy.get("@patchBlogPost").should("be.null");
    });

    it("should create record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.getCreateButton().click();

        cy.getSaveButton().should("not.be.disabled");
        cy.getChakraUILoadingOverlay().should("not.exist");
        fillForm();
        submitForm();

        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });

        // should sent a PATCH request after certain time
        cy.wait("@postBlogPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
            cy.getChakraUINotification().should("contain", "Success");
        });
    });

    it("should edit record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.getEditButton().first().click();

        cy.getSaveButton().should("not.be.disabled");
        cy.getChakraUILoadingOverlay().should("not.exist");
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
            cy.getChakraUINotification().should("contain", "Success");
        });
    });

    it("should delete record when mutation mode is pessimistic", () => {
        changeMutationMode("pessimistic");
        cy.getEditButton().first().click();

        cy.wait("@getBlogPost");
        // wait loading state and render to be finished
        cy.getSaveButton().should("not.be.disabled");
        cy.getChakraUILoadingOverlay().should("not.exist");

        cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

        cy.wait("@deleteBlogPost").then((interception) => {
            const deleteResponse = interception?.response;
            expect(deleteResponse?.statusCode).to.eq(200);

            cy.getChakraUINotification().contains(/success/gi);
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });

    it("should delete record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.getEditButton().first().click();

        cy.wait("@getBlogPost");
        // wait loading state and render to be finished
        cy.getSaveButton().should("not.be.disabled");
        cy.getChakraUILoadingOverlay().should("not.exist");

        cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

        // should show notification
        cy.getChakraUIToast().contains(/seconds to undo/gi);
        // notification should disappear after certain time
        cy.getChakraUIToast()
            .contains("seconds to undo", { timeout: 10000 })
            .should("not.exist");

        // should sent a PATCH request after certain time
        cy.wait("@deleteBlogPost").then(() => {
            cy.getChakraUINotification().contains(/success/gi);
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/blog-posts");
            });
        });
    });

    it("should undo deleting record when mutation mode is undoable", () => {
        changeMutationMode("undoable");
        cy.getEditButton().first().click();

        cy.wait("@getBlogPost");
        // wait loading state and render to be finished
        cy.getSaveButton().should("not.be.disabled");
        cy.getChakraUILoadingOverlay().should("not.exist");

        cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

        cy.getDeleteButton().should("be.disabled");
        // should show notification
        cy.getChakraUIToast().contains(/seconds to undo/gi);
        // click undo button
        cy.getChakraUIToast()
            .contains(/seconds to undo/gi)
            .siblings("button")
            .click();
        cy.getDeleteButton().should("not.be.disabled");
        cy.get("@deleteBlogPost").should("be.null");
    });

    it("should delete record when mutation mode is optimistic", () => {
        changeMutationMode("optimistic");
        cy.getEditButton().first().click();

        cy.wait("@getBlogPost");
        // wait loading state and render to be finished
        cy.getSaveButton().should("not.be.disabled");
        cy.getChakraUILoadingOverlay().should("not.exist");

        cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

        // should redirect to list page without waiting for response
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });

        // should sent a DELETE request after certain time
        cy.wait("@deleteBlogPost").then(() => {
            cy.getChakraUINotification().contains(/success/gi);
        });
    });
});
