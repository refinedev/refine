import { getIdFromURL } from "../../../utils";

Cypress.Commands.add("interceptGETPosts", () => {
    return cy
        .intercept(
            {
                method: "GET",
                pathname: "/posts",
            },
            {
                fixture: "posts.json",
            },
        )
        .as("getPosts");
});

Cypress.Commands.add("interceptGETPost", () => {
    return cy
        .fixture("posts")
        .then((posts) => {
            return cy.intercept(
                {
                    method: "GET",
                    pathname: "/posts/*",
                },

                (req) => {
                    const id = getIdFromURL(req.url);
                    const post = posts.find((post) => post.id === id);

                    if (!post) {
                        req.reply(404, {});
                        return;
                    }

                    req.reply(post);
                },
            );
        })
        .as("getPost");
});

Cypress.Commands.add("interceptPOSTPost", () => {
    return cy.fixture("posts").then((posts) =>
        cy
            .intercept(
                {
                    method: "POST",
                    pathname: "/posts",
                },
                (req) => {
                    req.reply({ ...req.body, id: posts.length + 1 });
                },
            )
            .as("postPost"),
    );
});

Cypress.Commands.add("interceptPATCHPost", () => {
    return cy
        .fixture("posts")
        .then((posts) => {
            return cy.intercept(
                {
                    method: "PATCH",
                    pathname: "/posts/*",
                },

                (req) => {
                    const id = getIdFromURL(req.url);
                    const post = posts.find((post) => post.id === id);

                    if (!post) {
                        req.reply(404, {});
                        return;
                    }

                    req.reply({ ...post, ...req.body });
                },
            );
        })
        .as("patchPost");
});

Cypress.Commands.add("interceptDELETEPost", () => {
    return cy
        .intercept(
            {
                method: "DELETE",
                pathname: "/posts/*",
            },
            {},
        )
        .as("deletePost");
});

Cypress.Commands.add("interceptGETCategories", () => {
    return cy
        .intercept(
            {
                method: "GET",
                pathname: "/categories",
            },
            { fixture: "categories.json" },
        )
        .as("getCategories");
});
