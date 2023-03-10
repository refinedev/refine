import { PostCreate } from "@components/posts";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function PostCreatePage() {
    return <PostCreate />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", [
                "common",
            ])),
        },
    };
};
