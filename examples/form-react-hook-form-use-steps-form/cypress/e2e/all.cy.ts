/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-material-ui-use-steps-form", () => {
    const BASE_URL = "http://localhost:3000";

    const mockPost = {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        status: "published",
        category: "1",
    };

    const goToNextStep = () => {
        cy.get("button").contains(/next/i).click();
    };

    const goToPreviousStep = () => {
        cy.get("button")
            .contains(/previous/i)
            .click();
    };

    const fillForm = () => {
        cy.get("#title").clear();
        cy.get("#title").type(mockPost.title);
        goToNextStep();

        cy.get("#status").select(mockPost.status);
        goToNextStep();

        cy.get("#content").clear();
        cy.get("#content").type(mockPost.content);
        cy.get("#category").select(mockPost.category);
    };

    const assertSuccessResponse = (response: any) => {
        const body = response?.body;

        expect(response?.statusCode).to.eq(200);
        expect(body).to.have.property("id");
        expect(body).to.have.property("category");
        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);
        expect(body?.category?.id).to.eq(mockPost.category);
        expect(body?.status?.toLowerCase()).to.eq(
            mockPost?.status?.toLowerCase(),
        );

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/posts");
        });
    };

    const submitForm = () => {
        return cy.get("button").contains(/save/i).click();
    };

    const waitForLoading = () => {
        cy.contains(/loading.../i).should("not.exist");
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
        cy.get("button").contains("Create Post").click();

        fillForm();
        submitForm();

        cy.wait("@postPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it.only("should edit record", () => {
        cy.get("button").contains(/edit/i).first().click();

        // wait loading state and render to be finished
        cy.wait("@getPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            expect(response?.statusCode).to.eq(200);
            // assert form values are filled with record data
            waitForLoading();
            cy.get("#title").should("have.value", body?.title);
            goToNextStep();
            cy.get("#status").should("have.value", body?.status);
            goToNextStep();
            cy.get("#content").should("have.value", body?.content);
            cy.get("#category").should("have.value", body?.category?.id);
            goToPreviousStep();
            goToPreviousStep();
        });

        fillForm();
        submitForm();

        cy.wait("@patchPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should create form render errors", () => {
        cy.get("button").contains("Create Post").click();

        submitForm();

        cy.get("#title-error").contains(/required/gi);
        cy.get("#content-error").contains(/required/gi);
        cy.get("#category-error").contains(/required/gi);

        fillForm();

        cy.get("#title-error").should("not.exist");
        cy.get("#content-error").should("not.exist");
        cy.get("#category-error").should("not.exist");
    });

    it("should edit form render errors", () => {
        cy.get("button").contains(/edit/i).first().click();

        // wait loading state and render to be finished
        cy.wait("@getPost");
        waitForLoading();

        cy.get("#title").should("not.have.value", "").clear();
        cy.get("#content").should("not.have.value", "").clear();
        cy.get("#status").should("not.have.value", "").select([]);
        cy.get("#category").should("not.have.value", "").select([]);

        submitForm();

        cy.get("#title-error").contains(/required/gi);
        cy.get("#content-error").contains(/required/gi);
        cy.get("#category-error").contains(/required/gi);

        fillForm();

        cy.get("#title-error").should("not.exist");
        cy.get("#content-error").should("not.exist");
        cy.get("#category-error").should("not.exist");
    });
});
