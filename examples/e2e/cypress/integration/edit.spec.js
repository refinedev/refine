import { getTitleOfFormItem, exactMatchRegexp } from "../integration/utils";
describe("edit page", () => {
    beforeEach(() => {
        cy.visit("/resources/posts");

        cy.intercept("GET", "/categories?id=*").as("getCategory");

        cy.getFirstRow({
            categoryInterception: "@getCategory",
            firstRowAlias: "firstRow",
            idAlias: "id",
            titleAlias: "title",
            categoryAlias: "category",
        });

        cy.get("@firstRow")
            .find("button.ant-btn")
            .contains(exactMatchRegexp("Edit"))
            .as("editButton");

        cy.get("@editButton").click();
    });

    it("should navigate to edit with correct form values", () => {
        // check inputs in edit page
        cy.get("@title").then((title) => {
            cy.get("input#title.ant-input").should("have.value", title);
        });

        cy.wait("@getCategory")
            .get("@category")
            .then((category) => {
                cy.get("input#category_id.ant-select-selection-search-input")
                    .parent()
                    .siblings(".ant-select-selection-item")
                    .then((div) => {
                        expect(category).eq(div[0].innerText);
                    });
            });
    });
    it("should render form items with label", () => {
        cy.get("input#title.ant-input").as("titleInput");
        cy.get("input#category_id.ant-select-selection-search-input").as(
            "categoryInput",
        );
        cy.get("input#status.ant-select-selection-search-input").as(
            "statusInput",
        );
        cy.get("textarea.mde-text").as("markdownArea");
        cy.get("button.ant-btn-primary")
            .contains(exactMatchRegexp("Save"))
            .as("saveButton");

        getTitleOfFormItem("@titleInput").contains(exactMatchRegexp("Title"));
        getTitleOfFormItem("@categoryInput").contains(
            exactMatchRegexp("Category"),
        );
        getTitleOfFormItem("@statusInput").contains(exactMatchRegexp("Status"));
        getTitleOfFormItem("@markdownArea").contains(
            exactMatchRegexp("Content"),
        );
    });
    it("should render edited items on list correctly", () => {
        const titleText = "Test Title";

        cy.wait("@getCategory");
        cy.get("input#title.ant-input").clear().type(titleText);
        cy.get("button.ant-btn-primary")
            .contains(exactMatchRegexp("Save"))
            .click();

        cy.get(".ant-table-row").contains(titleText);
    });

    it("should render delete infobox and delete succesfully", () => {
        cy.get("button.ant-btn-dangerous")
            .contains(exactMatchRegexp("Delete"))
            .click();

        cy.get(".ant-popover button.ant-btn-dangerous")
            .contains(exactMatchRegexp("Delete"))
            .click();

        cy.intercept("GET", "/posts*").as("getPosts");

        cy.wait("@getPosts");
        cy.get(".ant-table-row")
            .children("td:first-child")
            .then((ids) => {
                cy.get("@id").then((id) => {
                    for (let idCell of ids) {
                        expect(id).not.eq(idCell.innerText);
                    }
                });
            });

        cy.get(".ant-notification-notice-success").contains(
            "Successfully deleted a post",
        );
    });
});
