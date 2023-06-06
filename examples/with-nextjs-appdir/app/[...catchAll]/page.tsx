import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

import { authProvider } from "src/authProvider";

async function checkAuth(authCokkie: string | undefined) {
    return await authProvider.check(authCokkie);
}

type Props = {
    params: {
        catchAll: string[];
    };
};

export default async function CatchAll(props: Props) {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    const { authenticated, redirectTo } = await checkAuth(auth?.value);

    if (authenticated) {
        return notFound();
    } else {
        const pathname = props.params.catchAll.join("/");

        let to = "";
        // ignore only `/` routes
        if (pathname !== "/") {
            to = `?to=${pathname}`;
        }
        return redirect(`${redirectTo}${to}`);
    }
}
