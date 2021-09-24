export { NextRouteComponent as default } from "@pankod/refine";
import { GetServerSideProps } from "next";

import { authProvider } from "../src/authProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log({ context });

    let isAuthenticated = false;
    try {
        await authProvider.checkAuth(context);
        isAuthenticated = true;
    } catch (error) {}

    return {
        props: { isAuthenticated },
    };
};
