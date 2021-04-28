import { Show, useShow, Typography, Tag } from "@pankod/refine";

const { Title, Text } = Typography;

export const PostShow = () => {
    const { queryResult } = useShow({});
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Status</Title>
            <Tag>{record?.status}</Tag>
        </Show>
    );
};
