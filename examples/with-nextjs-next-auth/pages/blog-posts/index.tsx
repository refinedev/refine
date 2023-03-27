import { GetServerSideProps } from "next";
import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]";

const BlogPostList: React.FC = () => {
    return <AntdListInferencer />;
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    if (!session) {
        return {
            redirect: {
                destination: "/login?to=/blog-posts",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

export default BlogPostList;
