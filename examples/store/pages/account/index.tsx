import { GetServerSideProps } from "next";
import { useGetIdentity, useOne } from "@refinedev/core";
import { Customer, StoreCustomersListOrdersRes } from "@medusajs/medusa";

import { AccountLayout, Overview } from "@components/account";
import { getSearchStaticProps } from "@lib/search-props";

const ProfilePage: React.FC = () => {
    const { data } = useGetIdentity<Omit<Customer, "password_hash">>();

    const ordersData = useOne<StoreCustomersListOrdersRes>({
        resource: "customers",
        id: "/me/orders",
    });

    return (
        <AccountLayout>
            <Overview
                orders={ordersData.data?.data.orders || []}
                customer={data}
            />
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
