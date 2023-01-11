import { useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    Title,
    NumberField,
    TextField,
    MarkdownField,
} from "@pankod/refine-mantine";

export const ProductShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title my="xs" order={5}>
                Id
            </Title>
            <NumberField value={record?.id ?? ""} />
            <Title my="xs" order={5}>
                Name
            </Title>
            <TextField value={record?.name} />
            <Title my="xs" order={5}>
                Material
            </Title>
            <TextField value={record?.material} />
            <Title mt="xs" order={5}>
                Description
            </Title>
            <MarkdownField value={record?.description} />
            <Title my="xs" order={5}>
                Price
            </Title>
            <TextField value={record?.price} />
            <Title my="xs" order={5}>
                Category
            </Title>
            {categoryIsLoading ? (
                <>Loading...</>
            ) : (
                <>{categoryData?.data?.title}</>
            )}
        </Show>
    );
};
