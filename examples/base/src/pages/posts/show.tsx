import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    useOne,
} from "@pankod/refine";

import { IPost, ICategory } from "../../interfaces";

const { Title, Text, Paragraph } = Typography;

export const PostShow = (props: IResourceComponentsProps) => {
    const { queryResult } = useShow<IPost>({});
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const {
        data: categoryData,
        isLoading: categoryIsLoading,
    } = useOne<ICategory>("categories", record?.category.id, {
        enabled: !!record,
    });

    return (
        <Show {...props} isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Category</Title>
            <Text>
                {categoryIsLoading ? "Loading..." : categoryData?.data.title}
            </Text>

            <Title level={5}>Content</Title>
            <Paragraph>{record?.content}</Paragraph>
        </Show>
    );
};
