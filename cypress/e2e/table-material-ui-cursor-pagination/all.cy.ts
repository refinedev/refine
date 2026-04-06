/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

const makeCommitNodes = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    oid: `${prefix}${String(i).padStart(7, "0")}`,
    message: `commit ${prefix}-${i}`,
    authoredDate: "2026-01-01T00:00:00Z",
    committedDate: "2026-01-01T00:00:00Z",
    author: { name: "test", email: "test@test.com", date: "2026-01-01" },
    committer: { name: "test", email: "test@test.com", date: "2026-01-01" },
  }));

const buildGraphQLResponse = (
  nodes: ReturnType<typeof makeCommitNodes>,
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  },
) => ({
  data: {
    repository: {
      defaultBranchRef: {
        target: {
          __typename: "Commit",
          history: {
            totalCount: 100,
            nodes,
            pageInfo,
          },
        },
      },
    },
  },
});

describe("table-material-ui-cursor-pagination", () => {
  it("should work with pagination", () => {
    // Mock first page
    cy.intercept("POST", "https://api.github.com/graphql", (req) => {
      const { variables } = req.body;
      if (variables.first === 5 && !variables.after && !variables.before) {
        req.reply(
          buildGraphQLResponse(makeCommitNodes("aaa", 5), {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "cursor_start_1",
            endCursor: "cursor_end_1",
          }),
        );
      } else if (variables.first === 5 && variables.after === "cursor_end_1") {
        req.reply(
          buildGraphQLResponse(makeCommitNodes("bbb", 5), {
            hasNextPage: true,
            hasPreviousPage: true,
            startCursor: "cursor_start_2",
            endCursor: "cursor_end_2",
          }),
        );
      } else if (
        variables.last === 5 &&
        variables.before === "cursor_start_2"
      ) {
        req.reply(
          buildGraphQLResponse(makeCommitNodes("aaa", 5), {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "cursor_start_1",
            endCursor: "cursor_end_1",
          }),
        );
      } else {
        req.reply(
          buildGraphQLResponse(makeCommitNodes("zzz", 5), {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: null,
            endCursor: null,
          }),
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
