import gql from "graphql-tag";

export const COMMITS_LIST_QUERY = gql`
  query CommitsList(
    $owner: String!
    $name: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          __typename
          ... on Commit {
            history(first: $first, last: $last, after: $after, before: $before) {
              totalCount
              nodes {
                oid
                message
                authoredDate
                committedDate
                author {
                  name
                  email
                  date
                }
                committer {
                  name
                  email
                  date
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
        }
      }
    }
  }
`;
