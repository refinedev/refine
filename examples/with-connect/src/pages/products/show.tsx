import { useEffect } from "react";
import { IResourceComponentsProps, useResource } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography } from "antd";
import { useConnectMutation } from "@refinedev/connect";

import { IProduct } from "interfaces";

const { Title, Text } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
    const { id } = useResource();
    const { mutate, isLoading, data } = useConnectMutation<IProduct[]>();

    useEffect(() => {
        mutate({
            key: "postgresql-product",
            customParams: {
                id,
            },
        });
    }, []);

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{data?.[0].id}</Text>

            <Title level={5}>Name</Title>
            <Text>{data?.[0].name}</Text>

            <Title level={5}>Price</Title>
            <Text>{data?.[0].price}</Text>
        </Show>
    );
};
