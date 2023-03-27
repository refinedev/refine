import { AntdCreateInferencer } from "@refinedev/inferencer/antd";
import { getServerSession } from "next-auth";

import { authOptions } from "../../api/auth/[...nextauth]";

const BlogPostCreate: React.FC<{}> = () => {
    return <AntdCreateInferencer />;
};

export async function getServerSideProps(context: any) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    if (!session) {
        return {
            redirect: {
                destination: `/login?to=${encodeURIComponent(
                    context.req.url || "/",
                )}`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}

export default BlogPostCreate;
