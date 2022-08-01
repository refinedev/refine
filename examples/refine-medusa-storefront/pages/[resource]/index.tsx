export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";

import { dataProvider } from "@pankod/refine-medusa";

import { GetServerSideProps } from "next";

import { API_URL } from "../../src/constants";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;

    try {
        const data = await dataProvider(API_URL).getList({
            resource: query["resource"] as string,
        });

        return {
            props: {
                initialData: data,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};
