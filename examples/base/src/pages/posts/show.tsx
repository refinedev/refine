import { useShow, Show, Typography, MarkdownField } from "@pankod/refine";

const { Title, Text } = Typography;

export const PostShow = (props: any) => {
    const { queryResult } = useShow({});
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show {...props} isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content}></MarkdownField>
        </Show>
    );
};
