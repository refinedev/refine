import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    MarkdownField,
} from "@pankod/refine";

import { IPost } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>({
        metaData: {
            operation: "post",
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
                "content",
            ],
        },
    });
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Category</Title>
            <Text>{record?.category.title}</Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />
        </Show>
    );
};
