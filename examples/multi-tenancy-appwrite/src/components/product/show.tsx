import { useShow, IResourceComponentsProps } from "@refinedev/core";
import { Show, ImageField } from "@refinedev/antd";
import { Typography, Space } from "antd";

import { IProduct } from "interfaces";

const { Title, Text } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IProduct>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const image = record?.image ? JSON.parse(record.image) : [];

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Description</Title>
            <Text>{record?.description}</Text>

            <Title level={5}>Images</Title>
            <Space wrap>
                {image ? (
                    // eslint-disable-next-line
                    image.map((img: any) => (
                        <ImageField
                            key={img.name}
                            value={img.url}
                            title={img.name}
                            width={400}
                            height={300}
                        />
                    ))
                ) : (
                    <Text>Not found any images</Text>
                )}
            </Space>
        </Show>
    );
};
