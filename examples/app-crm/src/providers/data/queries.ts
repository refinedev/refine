import gql from "graphql-tag";

export const REFRESH_TOKEN_MUTATION = gql`
    mutation refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
        }
    }
`;
