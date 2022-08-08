import { GetServerSideProps } from "next";
import { LayoutWrapper, useGetIdentity } from "@pankod/refine-core";

import { getSearchStaticProps } from "@lib/search-props";
import AccountLayout from "@components/account/AccountLayout/AccountLayout";
import ProfileTemplate from "@components/profile/ProfileTemplate/ProfileTemplate";

const ProfilePage: React.FC = () => {
    return (
        <LayoutWrapper>
            <AccountLayout>
                <ProfileTemplate />
            </AccountLayout>
        </LayoutWrapper>
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
