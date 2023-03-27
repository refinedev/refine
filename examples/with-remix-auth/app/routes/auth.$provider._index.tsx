import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader = async ({ request, params, context }: LoaderArgs) => {
    const { provider } = params;
    await authenticator.authenticate(provider || "google", request, {
        failureRedirect: "/login",
    });
};
