/// <reference types="cypress" />

const mockPost = {
    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
    content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    status: "Published",
};

const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.content).to.eq(mockPost.content);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    cy.getAntdNotification().should("contain", "Success");
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
    });
};

export const list = () => {
    cy.url().should("include", "/posts");
    cy.get(".refine-pageHeader-title").should("contain", "Posts");
};

export const create = ({ ui }: IResourceCreateParams) => {
    cy.intercept("POST", "/posts").as("createPost");

    cy.getCreateButton().click();
    cy.url().should("include", "/posts/create");

    switch (ui) {
        case "antd":
            cy.get("#title").clear().type(mockPost.title);
            cy.get("#content textarea").clear().type(mockPost.content);
            cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
            cy.setAntdSelect({ id: "status", value: mockPost.status });
            break;
    }

    cy.getSaveButton().click();

    cy.wait("@createPost").then((interception) => {
        const response = interception?.response;
        assertSuccessResponse(response);
    });
};

export const edit = ({ ui }: IResourceEditParams) => {
    cy.intercept("GET", "/posts/*").as("getPost");
    cy.intercept("PATCH", "/posts/*").as("patchPost");

    cy.get(".refine-edit-button").first().click();
    cy.url().should("include", "/posts/edit");

    cy.wait("@getPost");
    cy.wait(500);

    switch (ui) {
        case "antd":
            cy.get("#title").clear().type(mockPost.title);
            cy.get("#content textarea").clear().type(mockPost.content);
            cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
            cy.setAntdSelect({ id: "status", value: mockPost.status });
            break;
    }

    cy.getSaveButton().click();

    cy.wait("@patchPost").then((interception) => {
        const response = interception?.response;
        assertSuccessResponse(response);
    });
};

export const show = () => {
    cy.get(".refine-show-button").first().click();
    cy.intercept("GET", "/posts/*").as("getPost");

    cy.wait("@getPost").then((interception) => {
        const response = interception?.response;

        const id = response?.body?.id;
        cy.url().should("include", `/posts/show/${id}`);

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
};
