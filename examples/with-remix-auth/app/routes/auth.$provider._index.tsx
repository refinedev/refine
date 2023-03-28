import { LoaderArgs, ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const action = async ({ request }: ActionArgs) => {
    await authenticator.authenticate("user-pass", request, {
        failureRedirect: "/login",
        successRedirect: "/user-pass",
    });
};

export const loader = async ({ request, params }: LoaderArgs) => {
    const { provider } = params;
    await authenticator.authenticate(provider || "google", request, {
        failureRedirect: "/login",
        successRedirect: "/asdfasdf",
    });
};
