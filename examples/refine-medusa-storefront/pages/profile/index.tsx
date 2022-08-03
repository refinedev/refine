import { GetServerSideProps } from "next";
import { LayoutWrapper, useGetIdentity } from "@pankod/refine-core";

import { Container, Text } from "@components/ui";
import { getSearchStaticProps } from "@lib/search-props";

const ProfilePage: React.FC = () => {
    const { data } = useGetIdentity();

    return (
        <LayoutWrapper>
            <Container className="pt-4">
                <Text variant="pageHeading">My Profile</Text>
                <div className="grid grid-cols-4">
                    {data && (
                        <div className="divide-accent-2 flex flex-col divide-y">
                            <div className="flex flex-row items-center space-x-4 py-4">
                                <span className="text-accent-600 flex-1 text-lg font-medium">
                                    Full Name
                                </span>
                                <span>
                                    {data.first_name} {data.last_name}
                                </span>
                            </div>
                            <div className="flex flex-row items-center space-x-4 py-4">
                                <span className="text-accent-600 flex-1 text-lg font-medium">
                                    Email
                                </span>
                                <span>{data.email}</span>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
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
