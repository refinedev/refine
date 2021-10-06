import { AuthProvider } from "@pankod/refine";
import { GetServerSidePropsContext, Redirect } from "next";

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
        if (context.req.url === "/") {
            return "/login";
        }

        return `/login?to=${encodeURIComponent(context.req.url ?? "")}`;
    };

    return {
        isAuthenticated,
        redirect: {
            destination: encodeURI(),
            permanent: false,
        },
    };
};
