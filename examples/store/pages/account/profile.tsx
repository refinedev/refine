import { GetServerSideProps } from "next";

import { getSearchStaticProps } from "@lib/search-props";
import { AccountLayout } from "@components/account";
import { ProfileTemplate } from "@components/profile";

const ProfilePage: React.FC = () => {
    return (
        <AccountLayout>
            <ProfileTemplate />
        </AccountLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const searchProps = await getSearchStaticProps();

        return {
            props: {
                ...searchProps.props,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default ProfilePage;
