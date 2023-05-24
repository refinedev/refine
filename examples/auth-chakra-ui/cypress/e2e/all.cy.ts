/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-chakra-ui", () => {
    const BASE_URL = "http://localhost:3000";

    const submitAuthForm = () => {
        return cy.get("button[type=submit]").click();
    };

    const login = () => {
        cy.get("#email").clear().type("demo@refine.dev");
        cy.get("#password").clear().type("demodemo");
        submitAuthForm();
    };

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit(BASE_URL);
    });

    it("should login", () => {
        login();
        cy.location("pathname").should("eq", "/posts");
        cy.getAllLocalStorage().then((ls) => {
            expect(ls[BASE_URL]).to.have.property("email");
        });
    });

    it("should throw error if login email is wrong", () => {
        cy.get("#email").clear().type("test@test.com");
        cy.get("#password").clear().type("test");
        submitAuthForm();
        cy.getChakraUINotification().contains(/login failed/i);
        cy.location("pathname").should("eq", "/login");
    });

    it("should has 'to' param on URL after redirected to /login", () => {
        login();
        cy.visit(`${BASE_URL}/test`);
        cy.location("pathname").should("eq", "/test");
        cy.clearAllLocalStorage();
        cy.reload();
        cy.location("search").should("contains", "to=%2Ftest");
        cy.location("pathname").should("eq", "/login");
    });

    it("should redirect to /login?to= if user not authenticated", () => {
        cy.visit(`${BASE_URL}/test-route`);
        cy.get(".chakra-heading").contains(/sign in to your account/i);
        cy.location("search").should("contains", "to=%2Ftest");
        cy.location("pathname").should("eq", "/login");
    });

    it("should register", () => {
        cy.get("a")
            .contains(/sign up/i)
            .click();
        cy.location("pathname").should("eq", "/register");
        login();
        cy.location("pathname").should("eq", "/posts");
        cy.getAllLocalStorage().then((ls) => {
            expect(ls[BASE_URL]).to.have.property("email");
        });
    });

    it("should throw error if register email is wrong", () => {
        cy.get("a")
            .contains(/sign up/i)
            .click();

        cy.get("#email").clear().type("test@test.com");
        cy.get("#password").clear().type("test");
        submitAuthForm();
        cy.getChakraUINotification().contains(/invalid email/i);
        cy.location("pathname").should("eq", "/register");
    });

    it("should throw error if forgot password email is wrong", () => {
        cy.visit(`${BASE_URL}/forgot-password`);
        cy.get("#email").clear().type("test@test.com");
        submitAuthForm();
        cy.getChakraUINotification().contains(/invalid email/i);
        cy.location("pathname").should("eq", "/forgot-password");
    });

    it("should throw error if update password is wrong", () => {
        cy.visit(`${BASE_URL}/update-password`);
        cy.get("#password").clear().type("123456");
        cy.get("#confirmPassword").clear().type("123456");
        submitAuthForm();
        cy.getChakraUINotification().contains(/invalid password/i);
        cy.location("pathname").should("eq", "/update-password");
    });

    it("should logout", () => {
        login();
        cy.get(".chakra-button")
            .contains(/logout/i)
            .click();
        cy.location("pathname").should("eq", "/login");
    });

    it("should render getIdentity response on header", () => {
        login();
        cy.get(".chakra-text").contains(/jane doe/i);
        cy.get(".chakra-avatar__img").should("have.attr", "src");
    });
});
