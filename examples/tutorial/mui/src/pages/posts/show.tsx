import { useOne, useShow } from "@pankod/refine-core";
import { Show, Stack, Typography, TagField } from "@pankod/refine-mui";
import { ICategory, IPost } from "interfaces";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Title
                </Typography>
                <Typography variant="body2">{record?.title}</Typography>
                <Typography variant="body1" fontWeight="bold">
                    Status
                </Typography>
                <Typography variant="body2">
                    <TagField value={record?.status} />
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>
                <Typography variant="body2">
                    {categoryData?.data.title}
                </Typography>
            </Stack>
        </Show>
    );
};
