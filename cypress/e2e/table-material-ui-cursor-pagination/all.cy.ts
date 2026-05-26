/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

import {
  buildGithubGraphqlResponse,
  makeGithubCommitNodes,
} from "../../utils/graphql";

describe("table-material-ui-cursor-pagination", () => {
  it("should work with pagination", () => {
    // Mock first page
    cy.intercept("POST", "https://api.github.com/graphql", (req) => {
      const { variables } = req.body;
      if (variables.first === 5 && !variables.after && !variables.before) {
        req.reply(
          buildGithubGraphqlResponse(
            makeGithubCommitNodes("aaa", 5),
            {
              hasNextPage: true,
              hasPreviousPage: false,
              startCursor: "cursor_start_1",
              endCursor: "cursor_end_1",
            },
            "Commit",
          ),
        );
      } else if (variables.first === 5 && variables.after === "cursor_end_1") {
        req.reply(
          buildGithubGraphqlResponse(
            makeGithubCommitNodes("bbb", 5),
            {
              hasNextPage: true,
              hasPreviousPage: true,
              startCursor: "cursor_start_2",
              endCursor: "cursor_end_2",
            },
            "Commit",
          ),
        );
      } else if (
        variables.last === 5 &&
        variables.before === "cursor_start_2"
      ) {
        req.reply(
          buildGithubGraphqlResponse(
            makeGithubCommitNodes("aaa", 5),
            {
              hasNextPage: true,
              hasPreviousPage: false,
              startCursor: "cursor_start_1",
              endCursor: "cursor_end_1",
            },
            "Commit",
          ),
        );
      } else {
        req.reply(
          buildGithubGraphqlResponse(
            makeGithubCommitNodes("zzz", 5),
            {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
            "Commit",
          ),
        );
      }
    }).as("graphql");

    cy.visit("/");

    cy.wait("@graphql");

    cy.get(".MuiDataGrid-root").should("be.visible");
    cy.get(".MuiDataGrid-row").should("have.length", 5);

    // Next should be enabled, Previous disabled
    cy.contains("button", "Next").should("not.be.disabled");
    cy.contains("button", "Previous").should("be.disabled");

    // Go to page 2
    cy.contains("button", "Next").click();
    cy.wait("@graphql");

    cy.get(".MuiDataGrid-row").should("have.length", 5);
    cy.contains("button", "Previous").should("not.be.disabled");

    // Go back to page 1
    cy.contains("button", "Previous").click();
    cy.wait("@graphql");

    cy.get(".MuiDataGrid-row").should("have.length", 5);
    cy.contains("button", "Previous").should("be.disabled");
    cy.contains("button", "Next").should("not.be.disabled");
  });
});
