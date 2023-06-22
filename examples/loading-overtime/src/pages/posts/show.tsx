import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";
import {
    Show,
    MarkdownField,
    overtimeComponents,
    LoadingOvertime,
} from "@refinedev/antd";
import { Typography, Alert } from "antd";

import { IPost, ICategory } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult, overtime } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "categories",
            id: record?.category.id || "",
            queryOptions: {
                enabled: !!record,
            },
        });

    const customOvertimeComponents = {
        ...overtimeComponents,
        1000: (
            <Alert
                message="Loading..."
                type="warning"
                showIcon
                closable
                style={{ marginBottom: "1rem" }}
            />
        ),
        2000: (
            <Alert
                message="Still loading..."
                type="warning"
                showIcon
                closable
                style={{ marginBottom: "1rem" }}
            />
        ),
        4000: (
            <Alert
                message="This is taking a while..."
                type="warning"
                showIcon
                closable
                style={{ marginBottom: "1rem" }}
            />
        ),
    };

    return (
        <LoadingOvertime
            overtimeComponents={customOvertimeComponents}
            elapsedTime={overtime.elapsedTime}
        >
            <Show isLoading={isLoading}>
                <Title level={5}>Id</Title>
                <Text>{record?.id}</Text>

                <Title level={5}>Title</Title>
                <Text>{record?.title}</Text>

                <Title level={5}>Category</Title>
                <Text>
                    {categoryIsLoading
                        ? "Loading..."
                        : categoryData?.data.title}
                </Text>

                <Title level={5}>Content</Title>
                <MarkdownField value={record?.content} />
            </Show>
        </LoadingOvertime>
    );
};
