/// <reference types="cypress" />

export const assertDocumentTitle = (resource: string, action?: IAction) => {
    switch (action) {
        case "list":
            cy.document().its("title").should("eq", `${resource} | refine`);
            break;
        case "edit":
            cy.document()
                .its("title")
                .should(
                    "match",
                    new RegExp(`^#\\d+ Edit ${resource} | refine$`),
                );
            break;
        case "show":
            cy.document()
                .its("title")
                .should(
                    "match",
                    new RegExp(`^#\\d+ Show ${resource} | refine$`),
                );
            break;
        case "create":
            cy.document()
                .its("title")
                .should("eq", `Create new ${resource} | refine`);
            break;
        case "clone":
            cy.document()
                .its("title")
                .should(
                    "match",
                    new RegExp(`^#\\d+ Clone ${resource} | refine$`),
                );
            break;
        default:
            cy.document().its("title").should("eq", `refine`);
            break;
    }
};
