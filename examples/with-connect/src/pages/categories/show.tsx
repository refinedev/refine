import { useEffect } from "react";
import { IResourceComponentsProps, useResource } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography } from "antd";
import { useConnectMutation } from "@refinedev/connect";

import { ICategory } from "interfaces";

const { Title, Text } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const { id } = useResource();
    const { mutate, isLoading, data } = useConnectMutation<ICategory>();

    useEffect(() => {
        mutate({
            key: "default-restapi-category",
            customParams: {
                id,
            },
        });
    }, []);

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{data?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{data?.title}</Text>
        </Show>
    );
};
