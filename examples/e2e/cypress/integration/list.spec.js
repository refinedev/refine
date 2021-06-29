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
        });
        it("must fetch data with true query", () => {
            cy.intercept("GET", "/posts*").as("getPosts");

            cy.get("@pagination")
                .find('li[title="2"].ant-pagination-item-2')
                .as("item-2");

            cy.get("@item-2").click();

            cy.wait("@getPosts").should(({ request }) => {
                expect(request.url).contain("_end=20&_start=10&");
            });
        });
    });

    it("should render default title correctly", () => {
        cy.get(".ant-page-header-heading-title").contains("Posts");
    });

    describe("Create button", () => {
        beforeEach(() => {
            cy.get('[data-testid="list-create-button"]').as("createButton");
        });

        it("should render create button", () => {
            cy.get("@createButton").contains("Create");
        });

        it("should navigate to create page route on create button click", () => {
            cy.location("pathname").should("eq", "/resources/posts");

            cy.get("@createButton").click();

            cy.location("pathname").should("eq", "/resources/posts/create");
        });
    });
});
