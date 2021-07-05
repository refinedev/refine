describe("Show", () => {
    beforeEach(() => {
        cy.visit("/resources/posts");

        cy.intercept("GET", "/categories?id=*").as("getCategory");
        cy.intercept("GET", "/categories/*").as("getCategories");

        cy.getFirstRow({
            categoryInterception: "@getCategory",
            firstRowAlias: "firstRow",
            idAlias: "id",
            titleAlias: "title",
            categoryAlias: "category",
        });
        cy.get("@firstRow")
            .find("button.ant-btn")
            .contains("Show")
            .as("showButton");

        cy.get("@showButton").click();
    });

    it("render record data correctly upon navigation to show page from list with show button", () => {
        cy.wait("@getCategories");

        cy.get(".ant-card-body").within(() => {
            cy.get("@id").then((id) => {
                cy.contains(id);
                console.log("id: ", id);
            });

            cy.get("@title").then((title) => {
                cy.contains(title);
                console.log("title: ", title);
            });
            cy.get("@category").then((category) => {
                cy.contains(category);
                console.log("category: ", category);
            });
        });
    });
});
