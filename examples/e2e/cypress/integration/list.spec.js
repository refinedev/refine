describe("list page", () => {
    beforeEach(() => {
        cy.visit("/resources/posts");
    });

    describe("pagination", () => {
        beforeEach(() => {
            cy.get("ul.ant-pagination").as("pagination");
        });
        it("has an item for page 1", () => {
            cy.get("@pagination")
                .find('li[title="1"].ant-pagination-item-1')
                .as("item-1");

            cy.get("@pagination")
                .find('li[title="2"].ant-pagination-item-2')
                .as("item-2");

            cy.intercept("GET", "**/posts/*").as("getPosts");

            cy.get("@item-2").click();

            cy.wait("@getPosts").then((data) => {
                console.log({ data });
            });
        });
    });
});
