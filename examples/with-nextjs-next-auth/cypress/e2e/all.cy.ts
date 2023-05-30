/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("with-nextjs-auth", () => {
    const BASE_URL = "http://localhost:3000";

    const submitAuthForm = () => {
        return cy.get("button[type=submit]").click();
    };

    const login = () => {
        cy.fixture("demo-auth-credentials").then((auth) => {
            cy.get("#email").clear();
            cy.get("#email").type(auth.email);
            cy.get("#password").clear();
            cy.get("#password").type(auth.password);
        });
        submitAuthForm();
    };

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit(BASE_URL);
    });

    describe("login", () => {
        it("should login", () => {
            login();
            cy.location("pathname").should("eq", "/blog-posts");
            cy.getAllLocalStorage().then((ls) => {
                expect(ls[BASE_URL]).to.have.property("nextauth.message");
            });
        });

        it("should has 'to' param on URL after redirected to /login", () => {
            login();
            cy.location("pathname").should("eq", "/blog-posts");

            cy.visit(`${BASE_URL}/test`);
            cy.location("pathname").should("eq", "/test");
            cy.clearAllCookies();
            cy.reload();
            cy.location("search").should("contains", "to=%2Ftest");
            cy.location("pathname").should("eq", "/login");
            cy.get(".ant-card-head-title > .ant-typography").contains(
                /sign in to your account/i,
            );

            login();
            cy.location("pathname").should("eq", "/test");
        });

        it("should redirect to /login?to= if user not authenticated", () => {
            cy.visit(`${BASE_URL}/test-route`);
            cy.get(".ant-card-head-title > .ant-typography").contains(
                /sign in to your account/i,
            );
            cy.location("search").should("contains", "to=%2Ftest");
            cy.location("pathname").should("eq", "/login");
        });
    });

    describe("logout", () => {
        it("should logout", () => {
            login();
            cy.get(".ant-menu-title-content")
                .contains(/logout/i)
                .click();
            cy.location("pathname").should("eq", "/login");
        });
    });

    describe("get identity", () => {
        it("should render getIdentity response on header", () => {
            login();
            cy.get(".ant-typography").contains(/john doe/i);
            cy.get(".ant-avatar > img").should("have.attr", "src");
        });
    });
});

export {};
