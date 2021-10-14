import { useLayoutEffect } from "react";
import { GetServerSideProps } from "next";
import dataProvider from "@pankod/refine-simple-rest";
import JSConfetti from "js-confetti";

import { API_URL } from "src/constants";
import { OrderSuccess } from "@components";
import { IOrder } from "@interfaces";

type OrderPageProps = {
    order: IOrder;
};

export const OrderDetail: React.FC<OrderPageProps> = ({ order }) => {
    useLayoutEffect(() => {
        const jsConfetti = new JSConfetti();
        setTimeout(() => {
            jsConfetti.addConfetti();
        }, 500);
    }, []);
    return <OrderSuccess order={order} />;
};

export default OrderDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    try {
        const { data: orderData } = await dataProvider(API_URL).getOne({
            resource: "orders",
            id: id as string,
        });

        return {
            props: { order: orderData },
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};
