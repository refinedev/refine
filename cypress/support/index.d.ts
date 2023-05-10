declare namespace Cypress {
    interface Chainable {
        resourceList(): Chainable<void>;
        resourceCreate(): Chainable<void>;
        resourceEdit(): Chainable<void>;
        resourceShow(): Chainable<void>;
    }
}
