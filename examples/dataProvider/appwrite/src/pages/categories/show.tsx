import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    useOne,
    MarkdownField,
    Space,
    ImageField,
} from "@pankod/refine";

import { ICategory } from "interfaces";

const { Title, Text } = Typography;

export const CategoriesShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<ICategory>();

    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading} title={`Show ${record?.title}`}>
            <Title level={5}>Id</Title>
            <Text>{record?.$id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
        </Show>
    );
};
