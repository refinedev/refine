import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    BooleanField,
} from "@refinedev/mui";

import Typography from "@mui/material/Box";
import Stack from "@mui/material/Box";

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {translate("categories.fields.id")}
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("categories.fields.title")}
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("isActive")}
                </Typography>
                <BooleanField value={record?.isActive} />
            </Stack>
        </Show>
    );
};
