import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@refinedev/nextjs-router/legacy";

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};
