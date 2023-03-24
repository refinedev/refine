import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: `${process.env.GITHUB_CLIENT_ID}`,
            clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        }),
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        }),
        Auth0Provider({
            clientId: `${process.env.AUTH0_CLIENT_ID}`,
            clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
            issuer: `${process.env.AUTH0_DOMAIN}`,
        }),
        KeycloakProvider({
            clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
            clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
            issuer: `${process.env.KEYCLOAK_DOMAIN}`,
        }),
    ],
    secret: `${process.env.AUTH_SECRET}}`,
};
export default NextAuth(authOptions);
