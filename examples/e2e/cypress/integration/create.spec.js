import {
    getTitleOfFormItem,
    getItemFromSelectDropdown,
    exactMatchRegexp,
} from "../integration/utils";

describe("create page", () => {
    beforeEach(() => {
        cy.intercept("GET", "/categories?id=*").as("getCategory");

        cy.visit("/posts/create");
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

    it("should render form items with title", () => {
        getTitleOfFormItem("@titleInput").should("have.text", "Title");
        getTitleOfFormItem("@categoryInput").should("have.text", "Category");
        getTitleOfFormItem("@statusInput").should("have.text", "Status");
        getTitleOfFormItem("@markdownArea").should("have.text", "Content");
    });

    it("should render save button with icon", () => {
        cy.get("@saveButton").siblings(".anticon-save");
    });

    it("redirects to edit with filled values after submitting the form", () => {
        const selectedStatus = "Rejected";
        const titleText = "Test title";
        const markdownContent = "Test content";

        // set title
        cy.log("set title input value");
        cy.get("@titleInput").type(titleText);

        // select category input and save for later use
        cy.log("select category input value");
        cy.get("@categoryInput").click();
        getItemFromSelectDropdown("div#category_id_list")
            .first()
            .then((div) => {
                cy.wrap(div[0]).as("selectedCategory");
            })
            .click();

        // select status input
        cy.log("select status input value");
        cy.get("@statusInput").click();
        getItemFromSelectDropdown("div#status_list")
            .contains(exactMatchRegexp(selectedStatus))
            .click();

        // set markdown content
        cy.log("set markdown editor value");
        cy.get("@markdownArea").type(markdownContent);

        // Trigger submit button and check if successfully created and then navigate to edit page.
        cy.log("Should create and navigate to edit page");
        cy.get("@saveButton").click();

        cy.location().should((location) => {
            expect(location.pathname).contains("/posts/edit");
        });

        cy.get("@titleInput").should("have.value", titleText);

        //Compare category value in Edit page with one selected at Create page
        cy.log(
            "check if category value in Edit page is same as created at Create page",
        );

        cy.wait("@getCategory");
        cy.get("@categoryInput")
            .parent()
            .siblings(".ant-select-selection-item")
            .then((div) => {
                cy.get("@selectedCategory").then((selectedCategory) => {
                    expect(selectedCategory.innerText).eq(div[0].innerText);
                });
            });

        //status input
        cy.get("@statusInput")
            .parent()
            .siblings(".ant-select-selection-item")
            .contains(exactMatchRegexp(selectedStatus));

        cy.get("@markdownArea").should("have.value", markdownContent);
    });
});
