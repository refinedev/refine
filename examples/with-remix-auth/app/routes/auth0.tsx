import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
    await authenticator.authenticate("auth0", request, {
        failureRedirect: "/login",
    });
};
