/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-modal-form", () => {
    const BASE_URL = "http://localhost:3000";

    const mockPost = {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        status: "Published",
    };

    const openModal = () => {
        return cy.getCreateButton().click();
    };

    const closeModal = () => {
        return cy
            .get(".ant-modal-footer > .ant-btn")
            .contains(/cancel/gi)
            .click();
    };

    const isModalVisible = () => {
        return cy.get(".ant-modal-content").should("be.visible");
    };

    const isModalNotVisible = () => {
        return cy.get(".ant-modal-content").should("not.be.visible");
    };

    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should open and close modal", () => {
        openModal();
        isModalVisible();
        // by X button
        cy.get(".ant-modal-close").click({ multiple: true, force: true });
        isModalNotVisible();

        openModal();
        isModalVisible();
        closeModal();
        isModalNotVisible();
    });

    it("should create a new record", () => {
        cy.intercept("POST", "/posts").as("createPost");

        openModal();
        cy.get("#title").type(mockPost.title);
        cy.setAntdSelect({ id: "status", value: mockPost.status });
        cy.get(".ant-modal-footer > .ant-btn-primary")
            .eq(0)
            .click({ force: true });

        cy.wait("@createPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            expect(response?.statusCode).to.eq(200);
            expect(body?.title).to.eq(mockPost.title);
            expect(body?.status?.toLowerCase()).to.eq(
                mockPost.status.toLowerCase(),
            );
            isModalNotVisible();
            cy.getAntdNotification().should("contain", "Success");
        });
    });

    it("should edit a record", () => {
        cy.intercept("GET", "/posts/*").as("getPost");
        cy.intercept("PATCH", "/posts/*").as("patchPost");

        cy.getEditButton().first().click();

        cy.wait("@getPost");
        cy.wait(500);

        cy.get("#title.ant-input")
            .eq(1)
            .clear({
                force: true,
            })
            .type(mockPost.title, { force: true });
        cy.get("input#status")
            .eq(1)
            .click({ force: true })
            .get(`.ant-select-item[title="${mockPost.status}"]`)
            .click({ force: true });
        cy.get(".ant-modal-footer > .ant-btn-primary")
            .eq(1)
            .click({ force: true });

        cy.wait("@patchPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            expect(response?.statusCode).to.eq(200);
            expect(body?.title).to.eq(mockPost.title);
            expect(body?.status?.toLowerCase()).to.eq(
                mockPost.status.toLowerCase(),
            );
            isModalNotVisible();
            cy.getAntdNotification().should("contain", "Success");
        });
    });
});
