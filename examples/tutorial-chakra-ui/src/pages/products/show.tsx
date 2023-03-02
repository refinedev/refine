import { useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    Heading,
    NumberField,
    TagField,
    HStack,
    TextField,
    MarkdownField,
} from "@pankod/refine-chakra-ui";

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
            <Heading as="h5" size="sm" mt={4}>
                Id
            </Heading>
            <NumberField value={record?.id ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Name
            </Heading>
            <TextField value={record?.name} />
            <Heading as="h5" size="sm" mt={4}>
                Material
            </Heading>
            <TextField value={record?.material} />
            <Heading as="h5" size="sm" mt={4}>
                Description
            </Heading>
            <MarkdownField value={record?.description} />
            <Heading as="h5" size="sm" mt={4}>
                Price
            </Heading>
            <TextField value={record?.price} />
            <Heading as="h5" size="sm" mt={4}>
                Category
            </Heading>
            {categoryIsLoading ? (
                <>Loading...</>
            ) : (
                <>{categoryData?.data?.title}</>
            )}
        </Show>
    );
};
