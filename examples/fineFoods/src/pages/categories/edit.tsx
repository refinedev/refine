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

export const CategoryEdit: React.FC<IResourceComponentsProps> = (props) => {
    const t = useTranslate();
    const { formProps, saveButtonProps } = useForm<ICategory>();

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
                    <Checkbox value={true}>
                        {t("categories:fields.isActive")}
                    </Checkbox>
                </Form.Item>
            </Form>
        </Edit>
    );
};
