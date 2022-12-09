import { getTitleOfFormItem, exactMatchRegexp } from "../integration/utils";
describe("edit page", () => {
    beforeEach(() => {
        cy.visit("/posts");

        cy.intercept("GET", "/categories*").as("getCategory");
        cy.intercept("GET", "/posts/*").as("getPost");

        cy.get(".ant-table-row")
            .first()
            .find("button.ant-btn")
            .contains(exactMatchRegexp("Edit"))
            .click();

        // Form items aliases
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
    });

    it("should navigate to edit with correct form values", () => {
        // check inputs in edit page
        cy.wait("@getPost").then((postRes) => {
            const { title, status, content } = postRes.response.body;

            cy.get("@titleInput").should("have.value", title);

            cy.get("@categoryInput")
                .parent()
                .siblings(".ant-select-selection-item")
                .should("not.be.empty");

            cy.get("@statusInput")
                .parent()
                .siblings(".ant-select-selection-item")
                .then((div) => {
                    expect(status).eq(div[0].innerText.toLowerCase());
                });

            cy.get("@markdownArea").should("have.value", content);
        });
    });

    it("should render form items with label", () => {
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
        cy.get("@titleInput").clear().type(titleText);
        cy.get("@saveButton").click();

        cy.get(".ant-table-row").contains(titleText);
    });

    it("should render delete infobox and delete succesfully", () => {
        cy.wait("@getPost").then((postRes) => {
            const {
                category: { id },
            } = postRes.response.body;

            cy.wrap(id).as("id");
        });

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
