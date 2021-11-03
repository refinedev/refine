import { GetServerSideProps } from "next";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { authProvider } from "../../src/authProvider";

export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { isAuthenticated, ...props } = await checkAuthentication(
        authProvider,
        context,
    );

    const translateProps = await serverSideTranslations(
        context.locale ?? "en",
        ["common"],
    );

    if (!isAuthenticated) {
        return {
            props: {
                ...props,
                ...translateProps,
            },
        };
    }

    return {
        props: {
            ...translateProps,
        },
    };
};
