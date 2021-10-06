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

    return {
        isAuthenticated,
        redirect: {
            destination: `/login?to=${encodeURIComponent(
                context.req.url ?? "",
            )}`,
            permanent: false,
        },
    };
};
