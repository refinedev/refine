import { useShow, useOne } from "@pankod/refine-core";
import { Show, NumberField, MarkdownField } from "@pankod/refine-mui";

import {
    Typography,
    Stack,
    TextFieldComponent as TextField,
} from "@mui/material";

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
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Name
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    Material
                </Typography>
                <TextField value={record?.material} />
                <Typography variant="body1" fontWeight="bold">
                    Description
                </Typography>
                <MarkdownField value={record?.description} />
                <Typography variant="body1" fontWeight="bold">
                    Price
                </Typography>
                <TextField value={record?.price} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>

                {categoryIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{categoryData?.data?.title}</>
                )}
            </Stack>
        </Show>
    );
};
