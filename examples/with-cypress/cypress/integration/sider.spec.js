import { exactMatchRegexp } from "../integration/utils";

describe("sider menu item", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("aside.ant-layout-sider").as("sider");
        cy.get("@sider").contains(exactMatchRegexp("Posts")).as("posts");
    });

    it("finds posts item", () => {
        cy.get("@posts")
            .should("have.class", "ant-menu-title-content")
            .as("posts-item");
    });

    it("posts with icon", () => {
        cy.get("@sider").find(".anticon-unordered-list");
    });

    it("navigates to correct route", () => {
        cy.location("pathname").should("eq", "/");

        cy.get("@posts").click();
        cy.location("pathname").should("eq", "/posts");
    });
});
