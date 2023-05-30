/// <reference types="cypress" />

const mockPost = {
    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
    content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    status: "Published",
};

const assertNotification = (ui: UITypes) => {
    switch (ui) {
        case "antd":
            return cy.getAntdNotification().should("contain", "Success");
    }
};

const waitLoadingOverlay = (ui: UITypes) => {
    switch (ui) {
        case "antd":
            return cy.getAntdLoadingOverlay().should("not.exist");
    }
};

const fillForm = (ui: UITypes) => {
    switch (ui) {
        case "antd":
            return cy.fillAntdForm();
        case "chakra-ui":
            return cy.fillChakraUIForm();
    }
};

const assertFormShouldHaveResponseValues = (response: any, ui: UITypes) => {
    const body = response?.body;

    // assert response values are equal to the form values
    switch (ui) {
        case "antd":
            break;
        case "chakra-ui":
            cy.get("#title").should("have.value", body?.title);
            cy.get("#status").should("have.value", body?.status);
            cy.get("#categoryId").should("have.value", body?.category?.id);
            break;
    }
};

const assertSuccessResponse = (response: any, ui: UITypes) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.content).to.eq(mockPost.content);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    assertNotification(ui);
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
    });
};

export const list = () => {
    cy.url().should("include", "/posts");
    cy.getPageHeaderTitle().should("contain", "Posts");

    cy.assertDocumentTitle("Posts", "list");
};

export const create = ({ ui }: IResourceCreateParams) => {
    cy.getCreateButton().click();
    cy.location("pathname").should("eq", "/posts/create");

    cy.assertDocumentTitle("Post", "create");

    fillForm(ui);

    cy.interceptPOSTPost();
    cy.getSaveButton().click();

    cy.wait("@postPost").then((interception) => {
        const response = interception?.response;
        assertSuccessResponse(response, ui);
    });
};

export const edit = ({ ui }: IResourceEditParams) => {
    cy.interceptGETCategories();
    cy.interceptGETPost();

    // wait loading state and render to be finished
    cy.wait("@getPosts");
    waitLoadingOverlay(ui);

    cy.getEditButton().first().click();
    cy.wait("@getCategories");
    cy.wait("@getPost").then((interception) => {
        const getResponse = interception?.response;

        // wait loading state and render to be finished
        waitLoadingOverlay(ui);
        cy.getSaveButton().should("not.be.disabled");
        cy.location("pathname").should("include", "/posts/edit");

        assertFormShouldHaveResponseValues(getResponse, ui);
    });

    cy.assertDocumentTitle("Post", "edit");

    fillForm(ui);

    cy.interceptPATCHPost();
    cy.getSaveButton().click();

    cy.wait("@patchPost").then((interception) => {
        const response = interception?.response;
        assertSuccessResponse(response, ui);
    });
};

export const show = () => {
    cy.interceptGETPost();
    cy.interceptGETCategory();

    cy.getShowButton().first().click();

    cy.assertDocumentTitle("Post", "show");

    cy.wait("@getPost").then((interception) => {
        const response = interception?.response;

        const id = response?.body?.id;
        cy.location("pathname").should("include", `/posts/show/${id}`);

        // should be visible id,title,content
        ["Id", "Title", "Content"].forEach((field) => {
            cy.get("body").should("contain", field);
        });
        // should be visible id,title,content values
        const title = response?.body?.title;
        const content = response?.body?.content;
        [id, title, content].forEach((value) => {
            cy.get("body").should("contain", value);
        });
    });

    cy.wait("@getCategory").then((interception) => {
        const response = interception?.response;

        const category = response?.body;
        cy.get("body").should("contain", category?.title);
    });
};

export const resourceDelete = ({ ui }: IResourceDeleteParams) => {
    cy.wait("@getPosts");
    waitLoadingOverlay(ui);

    cy.interceptGETPost();
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitLoadingOverlay(ui);
    cy.getSaveButton().should("not.be.disabled");

    cy.interceptDELETEPost();
    cy.getDeleteButton().first().click();
    switch (ui) {
        case "antd":
            cy.getAntdPopoverDeleteButton().click();
            break;
        case "chakra-ui":
            cy.getChakraUIPopoverDeleteButton().click();
            break;
    }

    cy.wait("@deletePost").then((interception) => {
        const response = interception?.response;

        expect(response?.statusCode).to.eq(200);
        assertNotification(ui);
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/posts");
        });
    });
};
