import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import { getServerSession } from "next-auth";

import { authOptions } from "../../api/auth/[...nextauth]";

const BlogPostShow: React.FC<{}> = () => {
    return <AntdShowInferencer />;
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

export default BlogPostShow;
