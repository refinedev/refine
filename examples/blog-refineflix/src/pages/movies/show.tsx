import { useShow, IResourceComponentsProps } from "@refinedev/core";
import { Show, ImageField } from "@refinedev/antd";
import { Typography, Space } from "antd";
import { Layout } from "components";

import { IMovies } from "interfaces";

const { Title, Text } = Typography;

export const MovieShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IMovies>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const renderDetail = () => (
        <>
            <Title level={5}>Director</Title>
            <Text>{record?.director || "-"}</Text>

            <Title level={5}>Stars</Title>
            <Text>{record?.stars || "-"}</Text>
            <Title level={5}>Trailer</Title>
            {record?.trailer && (
                <video width="400" controls>
                    <source src={record.trailer} type="video/mp4" />
                </video>
            )}
            <Title level={5}>Images</Title>
            <Space wrap>
                {record?.images ? (
                    record.images.map((img) => (
                        <ImageField
                            key={img.name}
                            value={img.url}
                            title={img.name}
                            width={200}
                        />
                    ))
                ) : (
                    <Text>Not found any images</Text>
                )}
            </Space>
        </>
    );

    return (
        <Layout>
            <Show
                isLoading={isLoading}
                headerProps={{
                    title: record?.name,
                    subTitle: record?.premiere,
                    extra: null,
                }}
            >
                {renderDetail()}
            </Show>
        </Layout>
    );
};
