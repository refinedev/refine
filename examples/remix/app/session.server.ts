import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { authProvider } from "./authProvider";

type LoginForm = {
    username: string;
    password: string;
};

const sessionSecret = "SUPER_SECRET_SESSION"; //process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
    cookie: {
        name: "RJ_session",
        // normally you want this to be `secure: true`
        // but that doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
});

export async function login({ username, password }: LoginForm) {
    try {
        const user = await authProvider.login({ username, password });
        if (user) {
            return { user };
        }
    } catch (error) {
        return error;
    }
}

export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname,
) {
    try {
        const user = await authProvider.checkAuth?.({ request, storage });
        return user;
    } catch (error) {
        const searchParams = new URLSearchParams([["to", redirectTo]]);
        throw redirect(`/login?${searchParams}`);
    }
}

export async function createUserSession(user: object, redirectTo: string) {
    const session = await storage.getSession();
    session.set("user", { ...user });
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    });
}

export async function logout(request: Request) {
    const session = await storage.getSession(request.headers.get("Cookie"));
    return redirect("/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session),
        },
    });
}
