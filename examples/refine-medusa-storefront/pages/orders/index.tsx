import { GetServerSideProps } from "next";
import { LayoutWrapper, useGetIdentity } from "@pankod/refine-core";

import { Container, Text } from "@components/ui";
import { Bag } from "@components/icons";
import { getSearchStaticProps } from "@lib/search-props";

const OrdersPage: React.FC = () => {
    const { data } = useGetIdentity();

    return (
        <LayoutWrapper>
            <Container className="pt-4">
                <Text variant="pageHeading">My Orders</Text>
                <div className="flex flex-1 flex-col items-center justify-center p-24 ">
                    <span className="border-secondary bg-primary text-primary flex h-16 w-16 items-center justify-center rounded-full border border-dashed p-12">
                        <Bag className="absolute" />
                    </span>
                    <h2 className="pt-6 text-center text-2xl font-bold tracking-wide">
                        No orders found
                    </h2>
                    <p className="text-accent-6 px-10 pt-2 text-center">
                        Biscuit oat cake wafer icing ice cream tiramisu pudding
                        cupcake.
                    </p>
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

export default OrdersPage;
