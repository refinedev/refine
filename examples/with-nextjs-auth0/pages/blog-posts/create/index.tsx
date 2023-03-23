import { GetServerSideProps } from "next";
import { AntdCreateInferencer } from "@refinedev/inferencer/antd";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

const BlogPostCreate: React.FC<{}> = () => {
    return <AntdCreateInferencer />;
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const authRequiredProps = withPageAuthRequired();
    const session = await getSession(context.req, context.res);
    if (!session?.user) {
        return {
            props: {},
            redirect: {
                destination: `/login?to=${encodeURIComponent("/blog-posts")}`,
            },
        };
    }

    return {
        props: {
            ...authRequiredProps,
        },
    };
};

export default BlogPostCreate;
