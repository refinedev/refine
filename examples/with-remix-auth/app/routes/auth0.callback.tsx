import type { LoaderArgs } from "@remix-run/node";

import { authenticator } from "~/utils/auth.server";

export const loader = ({ request }: LoaderArgs) => {
    return authenticator.authenticate("auth0", request, {
        failureRedirect: "/login",
        successRedirect: "http://localhost:3000/",
    });
};
