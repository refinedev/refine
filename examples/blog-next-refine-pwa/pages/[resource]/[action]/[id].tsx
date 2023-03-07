import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@refinedev/nextjs-router";

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};
