import { GetServerSideProps } from "next";
import { LayoutWrapper, useGetIdentity, useOne } from "@pankod/refine-core";
import { StoreCustomersListOrdersRes } from "@medusajs/medusa";

import { AccountLayout, Overview } from "@components/account";
import { getSearchStaticProps } from "@lib/search-props";

const ProfilePage: React.FC = () => {
    const { data } = useGetIdentity();

    const ordersData = useOne<StoreCustomersListOrdersRes>({
        resource: "customers",
        id: "/me/orders",
    });

    return (
        <LayoutWrapper>
            <AccountLayout>
                <Overview
                    orders={ordersData.data?.data.orders || []}
                    customer={data}
                />
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
