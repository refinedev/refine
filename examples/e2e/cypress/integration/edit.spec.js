const getTitleOfFormItem = (selector) =>
    cy
        .get(selector)
        .parents(".ant-row.ant-form-item")
        .find(".ant-form-item-label");

describe("edit page", () => {
    /* beforeEach(() => {}); */
    it("should navigate to edit with correct form values", () => {
        cy.visit("/resources/posts");

        cy.intercept("GET", "/categories?id=*").as("getCategory");

        cy.get(".ant-table-row").as("rows");
        cy.wait("@getCategory")
            .get("@rows")
            .first()
            .as("firstRow")
            .then(($tr) => {
                console.log("trrrr: ", $tr);
                cy.wrap($tr[0].children[1].innerText).as("title");
                cy.wrap($tr[0].children[2].innerText).as("category");
            });

        cy.get("@firstRow")
            .find("button.ant-btn")
            .contains("Edit")
            .as("editButton");

        cy.get("@editButton").click();

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
    it("should render form items with title", () => {
        cy.visit("/resources/posts/edit/1");
        cy.get("input#title.ant-input").as("titleInput");
        cy.get("input#category_id.ant-select-selection-search-input").as(
            "categoryInput",
        );
        cy.get("input#status.ant-select-selection-search-input").as(
            "statusInput",
        );
        cy.get("textarea.mde-text").as("markdownArea");
        cy.get("button.ant-btn-primary").contains("Save").as("saveButton");

        getTitleOfFormItem("@titleInput").contains("Title");
        getTitleOfFormItem("@categoryInput").contains("Category");
        getTitleOfFormItem("@statusInput").contains("Status");
        getTitleOfFormItem("@markdownArea").contains("Content");
    });
});
