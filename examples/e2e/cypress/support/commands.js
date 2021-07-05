// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
    "getFirstRow",
    ({
        categoryInterception = "@getCategory",
        firstRowAlias = "firstRow",
        idAlias = "id",
        titleAlias = "title",
        categoryAlias = "category",
    }) => {
        cy.get(".ant-table-row").as("rows");
        cy.wait(categoryInterception);
        cy.get("@rows")
            .first()
            .as(firstRowAlias)
            .then(($tr) => {
                cy.wrap($tr[0].children[0].innerText).as(idAlias);
                cy.wrap($tr[0].children[1].innerText).as(titleAlias);
                cy.wrap($tr[0].children[2].innerText).as(categoryAlias);
            });
    },
);
