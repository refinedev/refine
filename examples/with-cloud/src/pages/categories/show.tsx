import { useEffect } from "react";
import { IResourceComponentsProps, useResource } from "@pankod/refine-core";
import { Show, Typography } from "@pankod/refine-antd";
import { useCloudMutation } from "@pankod/refine-cloud";

import { ICategory } from "interfaces";

const { Title, Text } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const { id } = useResource();
    const { mutate, isLoading, data } = useCloudMutation<ICategory>();

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
