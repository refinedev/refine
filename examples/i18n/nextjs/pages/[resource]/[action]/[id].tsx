import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", [
                "common",
            ])),
        },
    };
};
