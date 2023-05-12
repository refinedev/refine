/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-mpdal-form", () => {
    const BASE_URL = "http://localhost:3000";

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
        cy.get("#title").type("test title");
        cy.setAntdSelect({ id: "status", value: "Published" });
        cy.get(".ant-modal-footer > .ant-btn-primary")
            .eq(0)
            .click({ force: true });

        cy.wait("@createPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            expect(response?.statusCode).to.eq(200);
            expect(body?.title).to.eq("test title");
            expect(body?.status?.toLowerCase()).to.eq("published");
            isModalNotVisible();
            cy.getAntdNotification().should("contain", "Success");
        });
    });

    it("should edit a record", () => {
        cy.intercept("GET", "/posts/*").as("getPost");
        cy.intercept("PATCH", "/posts/*").as("patchPost");

        // find first record and click .refine-edit-button button
        cy.get(".ant-table-row-level-0")
            .first()
            .find("td")
            .last()
            .within(() => {
                cy.get(".refine-edit-button").click();
            });

        cy.wait("@getPost");
        cy.wait(500);

        cy.get("#title.ant-input")
            .eq(1)
            .clear({
                force: true,
            })
            .type("test title", { force: true });
        cy.get("input#status")
            .eq(1)
            .click({ force: true })
            .get(`.ant-select-item[title="Published"]`)
            .click({ force: true });
        cy.get(".ant-modal-footer > .ant-btn-primary")
            .eq(1)
            .click({ force: true });

        cy.wait("@patchPost").then((interception) => {
            const response = interception?.response;
            const body = response?.body;

            expect(response?.statusCode).to.eq(200);
            expect(body?.title).to.eq("test title");
            expect(body?.status?.toLowerCase()).to.eq("published");
            isModalNotVisible();
            cy.getAntdNotification().should("contain", "Success");
        });
    });
});
