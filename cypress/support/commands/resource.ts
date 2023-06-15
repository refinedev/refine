/// <reference types="cypress" />
/// <reference types="../index.d.ts" />

const assertNotification = (ui: UITypes) => {
    switch (ui) {
        case "antd":
            return cy.getAntdNotification().should("contain", "Success");
        case "chakra-ui":
            return cy.getChakraUINotification().should("contain", "Success");
        case "mantine":
            return cy.getMantineNotification().should("contain", "Success");
        case "material-ui":
            return cy.getMaterialUINotification().should("contain", "Success");
    }
};

const waitLoadingOverlay = (ui: UITypes) => {
    switch (ui) {
        case "antd":
            return cy.getAntdLoadingOverlay().should("not.exist");
        case "chakra-ui":
            return cy.getChakraUILoadingOverlay().should("not.exist");
        case "mantine":
            return cy.getMantineLoadingOverlay().should("not.exist");
        case "material-ui":
            return cy.getMaterialUILoadingCircular().should("not.exist");
    }
};

const fillForm = (ui: UITypes) => {
    switch (ui) {
        case "antd":
            return cy.fillAntdForm();
        case "chakra-ui":
            return cy.fillChakraUIForm();
        case "mantine":
            return cy.fillMantineForm();
        case "material-ui":
            return cy.fillMaterialUIForm();
    }
};

const assertFormShouldHaveResponseValues = (response: any, ui: UITypes) => {
    const body = response?.body;

    // assert response values are equal to the form values
    switch (ui) {
        case "antd":
            cy.get("#title").should("have.value", body?.title);
            cy.get("#content textarea").should("have.value", body?.content);
            cy.get("#status")
                .parent()
                .siblings()
                .last()
                .should(($status) => {
                    return (
                        $status.val()?.toString().toLowerCase() ===
                        body?.status.toLowerCase()
                    );
                });
            cy.get("#category_id")
                .parent()
                .siblings()
                .last()
                .should(($category_id) => {
                    return (
                        $category_id.val()?.toString().toLowerCase() ===
                        body?.status.toLowerCase()
                    );
                });
            break;
        case "chakra-ui":
            cy.get("#title").should("have.value", body?.title);
            cy.get("#status").should("have.value", body?.status);
            cy.get("#content").should("have.value", body?.content);
            cy.get("#categoryId").should("have.value", body?.category?.id);
            break;

        case "mantine":
            cy.get("#title").should("have.value", body?.title);
            cy.get("#content textarea").should("have.value", body?.content);
            cy.get("#status").should(($status) => {
                return (
                    $status.val()?.toString().toLowerCase() ===
                    body?.status.toLowerCase()
                );
            });
            cy.fixture("categories").then((categories) => {
                const category = categories.find(
                    (category) => category.id === body?.category?.id,
                );
                cy.get("#categoryId").should("have.value", category?.title);
            });
            break;

        case "material-ui":
            cy.get("#title").should("have.value", body?.title);
            cy.get("#content").should("have.value", body?.content);
            cy.get("#status").should("have.value", body?.status);
            cy.fixture("categories").then((categories) => {
                const category = categories.find(
                    (category) => category.id === body?.category?.id,
                );
                cy.get("#category").should("have.value", category?.title);
            });
            break;
    }
};

const assertSuccessResponse = (response: any, ui: UITypes) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");

    cy.fixture("mock-post").then((mockPost) => {
        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);
        expect(body?.status?.toLowerCase()).to.eq(
            mockPost?.status?.toLowerCase(),
        );
    });

    assertNotification(ui);
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/blog-posts");
    });
};

export const list = () => {
    cy.url().should("include", "/blog-posts");
    cy.getPageHeaderTitle().then(($title) => {
        expect($title.text().toLowerCase()).to.eq("blog posts");
    });

    cy.assertDocumentTitle("Blog Posts", "list");
};

export const create = ({ ui }: IResourceCreateParams) => {
    cy.interceptGETCategories();

    cy.getCreateButton().click();
    cy.wait("@getCategories");
    cy.location("pathname").should("eq", "/blog-posts/create");

    cy.assertDocumentTitle("Blog Post", "create");

    fillForm(ui);

    cy.interceptPOSTBlogPost();
    cy.getSaveButton().click();

    cy.wait("@postBlogPost").then((interception) => {
        const response = interception?.response;
        assertSuccessResponse(response, ui);
    });
};

export const edit = ({ ui }: IResourceEditParams) => {
    cy.interceptGETCategories();
    cy.interceptGETBlogPost();

    // wait loading state and render to be finished
    cy.wait("@getBlogPosts");
    waitLoadingOverlay(ui);

    cy.getEditButton().first().click();
    cy.wait("@getCategories");
    cy.wait("@getBlogPost").then((interception) => {
        const getResponse = interception?.response;

        // wait loading state and render to be finished
        waitLoadingOverlay(ui);
        cy.getSaveButton().should("not.be.disabled");
        cy.location("pathname").should("include", "/blog-posts/edit");

        assertFormShouldHaveResponseValues(getResponse, ui);
    });

    cy.assertDocumentTitle("Blog Post", "edit");

    fillForm(ui);

    cy.interceptPATCHBlogPost();
    cy.getSaveButton().click();

    cy.wait("@patchBlogPost").then((interception) => {
        const response = interception?.response;
        assertSuccessResponse(response, ui);
    });
};

export const show = () => {
    cy.interceptGETBlogPost();
    cy.interceptGETCategory();

    cy.getShowButton().first().click();

    cy.assertDocumentTitle("Blog Post", "show");

    cy.wait("@getBlogPost").then((interception) => {
        const response = interception?.response;

        const id = response?.body?.id;
        cy.location("pathname").should("include", `/blog-posts/show/${id}`);

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
    cy.interceptGETCategories();
    cy.wait("@getBlogPosts");
    waitLoadingOverlay(ui);

    cy.interceptGETBlogPost();
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getBlogPost");
    waitLoadingOverlay(ui);
    cy.getSaveButton().should("not.be.disabled");

    cy.interceptDELETEBlogPost();
    cy.getDeleteButton().first().click();
    switch (ui) {
        case "antd":
            cy.getAntdPopoverDeleteButton().click();
            break;
        case "chakra-ui":
            cy.getChakraUIPopoverDeleteButton().click();
            break;
        case "mantine":
            cy.getMantinePopoverDeleteButton().click();
            break;
        case "material-ui":
            cy.getMaterialUIDeletePopoverButton().click();
            break;
    }

    cy.wait("@deleteBlogPost").then((interception) => {
        const response = interception?.response;

        expect(response?.statusCode).to.eq(200);
        assertNotification(ui);
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/blog-posts");
        });
    });
};
