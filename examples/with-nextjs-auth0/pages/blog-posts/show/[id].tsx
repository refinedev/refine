import { GetServerSideProps } from "next";
import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

const BlogPostShow: React.FC<{}> = () => {
    return <AntdShowInferencer />;
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

export default BlogPostShow;
