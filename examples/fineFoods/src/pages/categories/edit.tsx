import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
    useTranslate,
    Checkbox,
} from "@pankod/refine";

import { ICategory } from "interfaces";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        formProps,
        saveButtonProps,
        queryResult: { isFetching },
    } = useForm<ICategory>();

    return (
        <Edit isLoading={isFetching} saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
            >
                <Form.Item
                    label={t("categories:fields.title")}
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("categories:fields.isActive")}
                    name="isActive"
                    valuePropName="checked"
                >
                    <Checkbox>{t("categories:fields.isActive")}</Checkbox>
                </Form.Item>
            </Form>
        </Edit>
    );
};
