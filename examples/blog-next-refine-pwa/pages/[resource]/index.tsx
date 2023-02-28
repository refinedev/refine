import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router/legacy";

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};
