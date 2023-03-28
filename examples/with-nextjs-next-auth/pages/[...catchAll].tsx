import { ErrorComponent } from "@refinedev/antd";
import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

export default function CatchAll() {
    return <ErrorComponent />;
}

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
