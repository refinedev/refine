import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";

import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<{}>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
    {
        // !!! Should be stored in .env file.
        callbackURL: "http://localhost:3000/auth0/callback",
        clientID: "Be5vsLunFvpzPf4xfXtaMxrZUVBjjNPO",
        clientSecret:
            "08F9X84FvzpsimV16CQvlQuwJOlqk-GqQgEdcq_3xzrn1K3UHnTCcRgMCwBW7api",
        domain: "dev-qg1ftdys736bk5i3.us.auth0.com",
    },
    async ({ accessToken, extraParams, profile, refreshToken }) => {
        const { id, displayName, photos } = profile;
        return Promise.resolve({
            id,
            name: displayName,
            avatar: photos?.[0]?.value,
        });
    },
);

authenticator.use(auth0Strategy);
