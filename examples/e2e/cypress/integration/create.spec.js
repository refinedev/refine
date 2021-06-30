describe("create page", () => {
    beforeEach(() => {
        cy.visit("/resources/posts/create");
        cy.get("input#title.ant-input").as("titleInput");
        cy.get("input#category_id.ant-select-selection-search-input").as(
            "categoryInput",
        );
        cy.get("input#status.ant-select-selection-search-input").as(
            "statusInput",
        );
        cy.get("textarea.mde-text").as("markdownArea");
        cy.get("button.ant-btn-primary").contains("Save").as("saveButton");
    });

    it("should render form items with title", () => {
        cy.get("@titleInput")
            .parents(".ant-row.ant-form-item")
            .find(".ant-form-item-label")
            .contains("Title");
        cy.get("@categoryInput")
            .parents(".ant-row.ant-form-item")
            .find(".ant-form-item-label")
            .contains("Category");
        cy.get("@statusInput")
            .parents(".ant-row.ant-form-item")
            .find(".ant-form-item-label")
            .contains("Status");
        cy.get("@markdownArea")
            .parents(".ant-row.ant-form-item")
            .find(".ant-form-item-label")
            .contains("Content");
    });

    it("should render save button with icon", () => {
        cy.get("@saveButton").siblings(".anticon-save");
    });

    it("redirects to edit with filled values after submitting the form", () => {
        cy.get("@titleInput").type("Test title");

        cy.get("@categoryInput").click();
        cy.get("div#category_id_list")
            .parents(".ant-select-dropdown")
            .find(".ant-select-item")
            .first()
            .as("selectedCategory", { log: true })
            .click();

        cy.get("@statusInput").click();
        cy.get("div#status_list")
            .parents(".ant-select-dropdown")
            .find(".ant-select-item")
            .first()
            .click();

        cy.get("@markdownArea").type("Test content");

        cy.get("@saveButton").click();

        cy.location().should((location) => {
            expect(location.pathname).contains("resources/posts/edit");
        });

        cy.get("@titleInput").should("have.value", "Test title");

        cy.get("@categoryInput", { log: true });
    });
});
