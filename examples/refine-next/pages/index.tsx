export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { GetServerSideProps } from "next";
import { checkAuthentication } from "@pankod/refine-nextjs-router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};
