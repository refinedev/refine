/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("with-nextjs", () => {
    const BASE_URL = "http://localhost:3000";

    const fillForm = () => {
        cy.fixture("mock-post").then((mockPost) => {
            cy.get("#title").clear();
            cy.get("#title").type(mockPost.title);
            cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
            cy.setAntdSelect({ id: "status", value: mockPost.status });
        });
    };

    const assertSuccessResponse = (response: any) => {
        const body = response?.body;

        expect(response?.statusCode).to.eq(200);
        expect(body).to.have.property("id");
        expect(body).to.have.property("category");

        cy.fixture("mock-post").then((mockPost) => {
            expect(body?.title).to.eq(mockPost.title);
            // expect(body?.content).to.eq(mockPost.content);
            expect(body?.status?.toLowerCase()).to.eq(
                mockPost?.status?.toLowerCase(),
            );
        });

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/posts");
        });
    };

    const submitForm = () => {
        return cy.getSaveButton().click();
    };

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
        cy.interceptGETPost();
        cy.interceptPOSTPost();
        cy.interceptPATCHPost();
        cy.interceptDELETEPost();
        cy.interceptGETPosts();
        cy.interceptGETCategories();

        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit(BASE_URL);
    });

    describe("login", () => {
        it("should login", () => {
            login();
            cy.location("pathname").should("eq", "/");
            cy.getAllCookies().then((cookies) => {
                expect(cookies[0]).to.have.property("name", "auth");
            });
        });

        it("should throw error if login email is wrong", () => {
            cy.get("#email").clear().type("test@test.com");
            cy.get("#password").clear().type("test");
            submitAuthForm();
            cy.getAntdNotification().contains(/login failed/i);
            cy.location("pathname").should("eq", "/login");
        });

        it("should has 'to' param on URL after redirected to /login", () => {
            login();
            cy.location("pathname").should("eq", "/");

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

    describe("register", () => {
        it("should register", () => {
            cy.get("a")
                .contains(/sign up/i)
                .click();
            cy.location("pathname").should("eq", "/register");
            cy.get(".ant-card-head-title > .ant-typography").contains(
                /sign up/i,
            );
            login();
            cy.location("pathname").should("eq", "/");
            cy.getAllCookies().then((cookies) => {
                expect(cookies[0]).to.have.property("name", "auth");
            });
        });

        it("should throw error if register email is wrong", () => {
            cy.get("a")
                .contains(/sign up/i)
                .click();
            cy.location("pathname").should("eq", "/register");
            cy.get(".ant-card-head-title > .ant-typography").contains(
                /sign up/i,
            );
            cy.get("#email").type("test@test.com");
            cy.get("#password").type("test");
            submitAuthForm();
            cy.getAntdNotification().contains(/register failed/i);
            cy.location("pathname").should("eq", "/register");
        });
    });

    describe("forgot password", () => {
        it("should throw error if forgot password email is wrong", () => {
            cy.visit(`${BASE_URL}/forgot-password`);
            cy.get("#email").clear().type("test@test.com");
            submitAuthForm();
            cy.getAntdNotification().contains(/forgot password failed/i);
            cy.location("pathname").should("eq", "/forgot-password");
        });
    });

    describe("update password", () => {
        it("should throw error if update password is wrong", () => {
            cy.visit(`${BASE_URL}/update-password`);
            cy.get("#password").clear().type("123456");
            cy.get("#confirmPassword").clear().type("123456");
            submitAuthForm();
            cy.getAntdNotification().contains(/update password failed/i);
            cy.location("pathname").should("eq", "/update-password");

            cy.get("#password").clear().type("12345");
            cy.getAntdFormItemError({ id: "confirmPassword" }).contains(
                /do not match/i,
            );
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
            cy.get(".ant-typography").contains(/jane doe/i);
            cy.get(".ant-avatar > img").should("have.attr", "src");
        });
    });

    describe("crud", () => {
        beforeEach(() => {
            login();
        });

        it("should create record", () => {
            cy.getCreateButton().click();
            cy.wait("@getCategories");
            cy.location("pathname").should("eq", "/posts/create");

            cy.assertDocumentTitle("Post", "create");

            fillForm();
            submitForm();

            cy.wait("@postPost").then((interception) => {
                const response = interception?.response;
                assertSuccessResponse(response);
            });
        });

        it("should edit record", () => {
            // wait loading state and render to be finished
            cy.wait("@getPosts");
            cy.getAntdLoadingOverlay().should("not.exist");

            cy.getEditButton().last().click();
            cy.wait("@getPost");
            cy.wait("@getCategories");

            cy.assertDocumentTitle("Post", "edit");

            fillForm();
            submitForm();

            cy.wait("@patchPost").then((interception) => {
                const response = interception?.response;

                assertSuccessResponse(response);
            });
        });

        it("should delete record", () => {
            cy.wait("@getPosts");
            cy.getAntdLoadingOverlay().should("not.exist");

            cy.getEditButton().last().click();

            // wait loading state and render to be finished
            cy.wait("@getPost");
            cy.getAntdLoadingOverlay().should("not.exist");
            cy.getSaveButton().should("not.be.disabled");

            cy.getDeleteButton().last().click();
            cy.getAntdPopoverDeleteButton().click();

            cy.wait("@deletePost").then((interception) => {
                const response = interception?.response;

                expect(response?.statusCode).to.eq(200);
                cy.getAntdNotification().should("contain", "Success");
                cy.location().should((loc) => {
                    expect(loc.pathname).to.eq("/posts");
                });
            });
        });

        it("should create form render errors", () => {
            cy.getCreateButton().click();

            submitForm();
            cy.getAntdFormItemError({ id: "title" }).contains(
                /please enter title/gi,
            );
            cy.getAntdFormItemError({ id: "category_id" }).contains(
                /please enter category/gi,
            );
            cy.getAntdFormItemError({ id: "status" }).contains(
                /please enter status/gi,
            );

            fillForm();

            cy.getAntdFormItemError({ id: "title" }).should("not.exist");
            cy.getAntdFormItemError({ id: "category_id" }).should("not.exist");
            cy.getAntdFormItemError({ id: "status" }).should("not.exist");
        });

        it("should edit form render errors", () => {
            cy.getEditButton().last().click();

            // wait loading state and render to be finished
            cy.wait("@getPost");
            cy.getSaveButton().should("not.be.disabled");
            cy.getAntdLoadingOverlay().should("not.exist");

            cy.get("#title").should("not.have.value", "");
            cy.get("#title").clear();

            cy.getAntdFormItemError({ id: "title" }).contains(
                /please enter title/gi,
            );

            fillForm();

            cy.getAntdFormItemError({ id: "title" }).should("not.exist");
        });

        it("should create form warn when unsaved changes", () => {
            cy.wait("@getPosts");
            cy.getCreateButton().click();
            cy.get("#title").type("any value");
            cy.get(".ant-page-header-back-button > .ant-btn").click();
            cy.on("window:confirm", (str) => {
                expect(str).to.includes("You have unsaved changes");
            });
        });

        it("should edit form warn when unsaved changes", () => {
            cy.wait("@getPosts");
            cy.getEditButton().last().click();

            // wait loading state and render to be finished
            cy.wait("@getPost");
            cy.getSaveButton().should("not.be.disabled");
            cy.getAntdLoadingOverlay().should("not.exist");

            cy.get("#title").clear();
            cy.get("#title").type("any value");
            cy.get(".ant-page-header-back-button > .ant-btn").click();
            cy.on("window:confirm", (str) => {
                expect(str).to.includes("You have unsaved changes");
            });
        });
    });
});

export {};
