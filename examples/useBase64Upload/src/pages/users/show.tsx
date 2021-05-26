import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    useOne,
    MarkdownField,
} from "@pankod/refine";

// import { IPost, ICategory } from "../../interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = (props) => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne(
        "categories",
        record?.category.id || "",
        {
            enabled: !!record,
        },
    );

    return (
        <Show {...props} isLoading={isLoading}>
            {record && (
                <>
                    <Title level={5}>Id</Title>
                    <Text>{record.id}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record.title}</Text>

                    <Title level={5}>Category</Title>
                    <Text>
                        {categoryIsLoading
                            ? "Loading..."
                            : categoryData?.data.title}
                    </Text>

                    <Title level={5}>Content</Title>
                    <MarkdownField value={record.content} />
                </>
            )}
        </Show>
    );
};
