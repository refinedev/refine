import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";
import { API_BASE_URL, API_URL, dataProvider } from "./data";
import { User } from "@interfaces";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const emails = [
    "michael.scott@dundermifflin.com",
    "jim.halpert@dundermifflin.com",
    "pam.beesly@dundermifflin.com",
    "dwight.schrute@dundermifflin.com",
    "angela.martin@dundermifflin.com",
    "stanley.hudson@dundermifflin.com",
    "phyllis.smith@dundermifflin.com",
    "kevin.malone@dundermifflin.com",
    "oscar.martinez@dundermifflin.com",
    "creed.bratton@dundermifflin.com",
    "meredith.palmer@dundermifflin.com",
    "ryan.howard@dundermifflin.com",
    "kelly.kapoor@dundermifflin.com",
    "andy.bernard@dundermifflin.com",
    "toby.flenderson@dundermifflin.com",
];

const randomEmail = emails[Math.floor(Math.random() * emails.length)];

export const demoCredentials = {
    email: randomEmail,
    password: "demodemo",
};

export const authProvider: AuthBindings = {
    login: async ({ email, providerName, accessToken, refreshToken }) => {
        if (accessToken && refreshToken) {
            nookies.set(null, "access_token", accessToken, {
                maxAge: 3 * 24 * 60 * 60, // 3 days
                path: "/",
            });
            nookies.set(null, "refresh_token", refreshToken, {
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: "/",
            });

            return {
                success: true,
                redirectTo: "/",
            };
        }

        if (providerName) {
            window.location.href = `${API_BASE_URL}/auth/${providerName}`;

            return {
                success: true,
            };
        }

        try {
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: { email },
                    rawQuery: `
                mutation Login($email: String!) {
                    login(loginInput: {
                      email: $email
                    }) {
                      accessToken,
                      refreshToken
                    }
                  }
                `,
                },
            });

            nookies.set(null, "access_token", data.login.accessToken, {
                maxAge: 3 * 24 * 60 * 60, // 3 days
                path: "/",
            });
            nookies.set(null, "refresh_token", data.login.refreshToken, {
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: "/",
            });

            return {
                success: true,
                redirectTo: "/",
            };
        } catch (error: any) {
            return {
                success: false,
                error: {
                    message:
                        "message" in error ? error.message : "Login failed",
                    name:
                        "name" in error
                            ? error.name
                            : "Invalid email or password",
                },
            };
        }
    },
    register: async ({ email, password }) => {
        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: { email, password },
                    rawQuery: `
                mutation register($email: String!, $password: String!) {
                    register(registerInput: {
                      email: $email
                        password: $password
                    }) {
                        id
                        email
                    }
                  }
                `,
                },
            });
            return {
                success: true,
                redirectTo: `/login?email=${email}`,
            };
        } catch (error: any) {
            return {
                success: false,
                error: {
                    message:
                        "message" in error ? error.message : "Register failed",
                    name:
                        "name" in error
                            ? error.name
                            : "Invalid email or password",
                },
            };
        }
    },
    logout: async () => {
        nookies.destroy(null, "access_token");
        nookies.destroy(null, "refresh_token");

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        return { error };
    },
    check: async (ctx?: GetServerSidePropsContext) => {
        console.log(ctx);
        const accessToken = nookies.get(ctx).access_token;
        if (!accessToken) return { authenticated: false, redirectTo: "/login" };

        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: ctx
                    ? {
                          Authorization: `Bearer ${accessToken}`,
                      }
                    : {},
                meta: {
                    rawQuery: `
                    query Me {
                        me {
                          name
                        }
                      }
                `,
                },
            });

            return {
                authenticated: true,
                redirectTo: "/",
            };
        } catch (error) {
            console.log("fetch check error", error);

            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }
    },
    forgotPassword: async () => {
        return {
            success: true,
            redirectTo: "/update-password",
        };
    },
    updatePassword: async () => {
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    getIdentity: async () => {
        const accessToken = nookies.get().access_token;

        try {
            const { data } = await dataProvider.custom<{ me: User }>({
                url: API_URL,
                method: "post",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                meta: {
                    rawQuery: `
                    query Me {
                        me {
                            id,
                            name,
                            email,
                            phone,
                            jobTitle,
                            timezone
                            avatarUrl
                        }
                      }
                `,
                },
            });

            return data.me;
        } catch (error) {
            return undefined;
        }
    },
};

export const withAuth = (gssp: GetServerSideProps): GetServerSideProps => {
    return async (context: GetServerSidePropsContext) => {
        const { authenticated, redirectTo } = await authProvider.check(context);

        console.log("fetch withAuth", {
            authenticated,
            redirectTo,
            url: context.req.url,
        });

        if (!authenticated) {
            return {
                props: {},
                redirect: {
                    destination: `${redirectTo}?to=${encodeURIComponent(
                        context.req.url || "/",
                    )}`,
                    permanent: false,
                },
            };
        }

        const gsspData = await gssp(context);
        if (!("props" in gsspData)) {
            throw new Error("invalid getSSP result");
        }

        if (authenticated) {
            return {
                props: {},
                redirect: {
                    destination: redirectTo || "/",
                    permanent: false,
                },
            };
        }

        return {
            props: {
                ...gsspData.props,
            },
        };
    };
};
