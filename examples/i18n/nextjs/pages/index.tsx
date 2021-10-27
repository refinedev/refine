export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { GetServerSideProps } from "next";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { authProvider } from "../src/authProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { isAuthenticated, redirect } = await checkAuthentication(
        authProvider,
        context,
    );

    if (!isAuthenticated) {
        return { redirect };
    }

    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", [
                "common",
            ])),
        },
    };
};
