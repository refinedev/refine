import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    useOne,
    MarkdownField,
    Alert,
    Space,
    Button,
    DeleteButton,
    ListButton,
    EditButton,
    RefreshButton,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);

    const { queryResult } = useShow<IPost>({
        liveMode: "controlled",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

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

    const handleRefresh = () => {
        queryResult.refetch();
        setIsDeprecated(false);
    };

    return (
        <Show
            isLoading={isLoading}
            pageHeaderProps={{
                extra: (
                    <>
                        <ListButton />
                        <EditButton />
                        <DeleteButton />
                        <RefreshButton onClick={handleRefresh} />
                    </>
                ),
            }}
        >
            {isDeprecated && (
                <Alert
                    message="This post is changed. Reload to see it's latest version."
                    type="warning"
                    style={{
                        marginBottom: 20,
                    }}
                    action={
                        <Space>
                            <Button
                                onClick={handleRefresh}
                                size="small"
                                type="ghost"
                            >
                                Refresh
                            </Button>
                        </Space>
                    }
                />
            )}

            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Category</Title>
            <Text>
                {categoryIsLoading ? "Loading..." : categoryData?.data.title}
            </Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />
        </Show>
    );
};
