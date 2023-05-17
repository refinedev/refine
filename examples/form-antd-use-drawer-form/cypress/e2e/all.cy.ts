/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-drawer-form", () => {
    const BASE_URL = "http://localhost:3000";

    const mockPost = {
        title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
        status: "Published",
    };

    const openDrawer = () => {
        return cy.getCreateButton().click();
    };

    const closeDrawer = () => {
        return cy.get(".ant-drawer-close").eq(0).click();
    };

    const isDrawerVisible = () => {
        return cy.get(".ant-drawer-content").should("be.visible");
    };

    const isDrawerNotVisible = () => {
        return cy.get(".ant-drawer-content").should("not.be.visible");
    };

    const findFirstRecordFromTable = () => {
        return cy
            .get(".ant-table-row-level-0")
            .first()
            .find("td")
            .last()
            .within(() => {
                cy.get(".refine-edit-button").click();
            });
    };

    const assertSuccessResponse = (response: any) => {
        const body = response?.body;

        expect(response?.statusCode).to.eq(200);
        expect(body?.title).to.eq(mockPost.title);
        expect(body?.status?.toLowerCase()).to.eq(
            mockPost?.status?.toLowerCase(),
        );
        isDrawerNotVisible();
        cy.getAntdNotification().should("contain", "Success");
    };

    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it("should open and close drawer", () => {
        openDrawer();
        isDrawerVisible();
        closeDrawer();
        isDrawerNotVisible();

        openDrawer();
        isDrawerVisible();
        // outside click
        cy.get(".ant-drawer-mask").click({ force: true });
        isDrawerNotVisible();
    });

    it("should create a new record", () => {
        cy.intercept("POST", "/posts").as("createPost");

        openDrawer();
        cy.get("#title").type(mockPost.title);
        cy.setAntdSelect({ id: "status", value: mockPost.status });
        cy.getSaveButton().eq(0).click();

        cy.wait("@createPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });

    it("should edit a record", () => {
        cy.intercept("GET", "/posts/*").as("getPost");
        cy.intercept("PATCH", "/posts/*").as("patchPost");

        findFirstRecordFromTable();

        cy.wait("@getPost");
        cy.wait(500);

        cy.get("#title.ant-input").eq(1).clear();
        cy.get("#title.ant-input").eq(1).type(mockPost.title);
        cy.get("input#status")
            .eq(1)
            .click({ force: true })
            .get(`.ant-select-item[title="Published"]`)
            .click({ force: true })
            .get("input#status")
            .eq(1)
            .blur();
        cy.getSaveButton().eq(1).click();

        cy.wait("@patchPost").then((interception) => {
            const response = interception?.response;
            assertSuccessResponse(response);
        });
    });
});
