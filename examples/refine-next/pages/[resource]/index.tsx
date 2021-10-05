export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { GetServerSideProps } from "next";

import { authProvider } from "../../src/authProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let isAuthenticated = false;
    try {
        await authProvider.checkAuth(context);
        isAuthenticated = true;
    } catch (error) {}

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: `/login?to=${context.req.url}`,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
