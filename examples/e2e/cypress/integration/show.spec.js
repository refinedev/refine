describe("Show", () => {
    beforeEach(() => {
        cy.visit("/resources/posts");

        cy.intercept("GET", "/categories?id=*").as("getCategory");

        cy.wait("@getCategory");
        cy.get(".ant-table-row").as("rows");
        cy.get("@rows")
            .first()
            .as("firstRow")
            .then(($tr) => {
                cy.wrap($tr[0].children[0].innerText).as("id");
                cy.wrap($tr[0].children[1].innerText).as("title");
                cy.wrap($tr[0].children[2].innerText).as("category");
            });

        cy.get("@firstRow")
            .find("button.ant-btn")
            .contains("Show")
            .as("showButton");

        cy.get("@showButton").click();
    });

    it("render record data correctly upon navigation to show page from list with show button", () => {
        cy.intercept("GET", "/categories/*").as("getCategories");
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
