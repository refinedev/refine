describe("edit page", () => {
    /* beforeEach(() => {}); */
    it("should navigate to edit with correct form values", () => {
        cy.visit("/resources/posts");

        cy.get(".ant-table-row").as("rows");
        cy.get("@rows")
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

        cy.get("@category").then((category) => {
            cy.get("input#category_id.ant-select-selection-search-input")
                .parent()
                .siblings(".ant-select-selection-item")
                .then((div) => {
                    expect(category).eq(div[0].innerText);
                    /* cy.get("@selectedCategory").then((selectedCategory) => {
                        expect(selectedCategory.innerText).eq(div[0].innerText);
                    }); */
                });
        });
    });

    /*   cy.get('div').should(($div) => {
        // access the native DOM element
        expect($div.get(0).innerText).to.eq('foobarbaz')
      })
       */

    /* it("should navigate to list with edited values", () => {
        cy.visit("/resources/posts/edit");

    }); */
});
