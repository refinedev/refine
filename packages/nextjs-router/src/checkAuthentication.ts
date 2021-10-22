import { AuthProvider } from "@pankod/refine";
import { GetServerSidePropsContext, Redirect } from "next";
import Router from "next/router";

export const checkAuthentication = async (
    authProvider: AuthProvider,
    context: GetServerSidePropsContext,
): Promise<{
    isAuthenticated: boolean;
    redirect: Redirect;
}> => {
    let isAuthenticated = false;
    try {
        await authProvider.checkAuth(context);
        isAuthenticated = true;
    } catch (error) {}

    const encodeURI = () => {
        if (context.resolvedUrl === "/" || context.resolvedUrl === undefined) {
            return "/login";
        }

        return `/login?to=${encodeURIComponent(context.resolvedUrl)}`;
    };

    return {
        isAuthenticated,
        redirect: {
            destination: encodeURI(),
            permanent: false,
        },
    };
};
