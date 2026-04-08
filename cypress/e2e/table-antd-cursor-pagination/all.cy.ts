/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

import {
  buildGithubGraphqlResponse,
  makeGithubCommitNodes,
} from "../../utils/graphql";

describe("table-antd-cursor-pagination", () => {
  it("should work with pagination", () => {
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

    cy.get(".ant-table").should("be.visible");
    cy.get(".ant-table-row").should("have.length", 5);

    // Next should be enabled, Previous disabled
    cy.get(".ant-table-footer").within(() => {
      cy.contains("button", "Next").should("not.be.disabled");
      cy.contains("button", "Previous").should("be.disabled");
    });

    // Go to page 2
    cy.get(".ant-table-footer").contains("button", "Next").click();
    cy.wait("@graphql");

    cy.get(".ant-table-row").should("have.length", 5);
    cy.get(".ant-table-footer").within(() => {
      cy.contains("button", "Previous").should("not.be.disabled");
    });

    // Go back to page 1
    cy.get(".ant-table-footer").contains("button", "Previous").click();
    cy.wait("@graphql");

    cy.get(".ant-table-row").should("have.length", 5);
    cy.get(".ant-table-footer").within(() => {
      cy.contains("button", "Previous").should("be.disabled");
      cy.contains("button", "Next").should("not.be.disabled");
    });
  });
});
