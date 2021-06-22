import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
    useTranslate,
    Checkbox,
} from "@pankod/refine";

import { IStore } from "interfaces";

export const StoreCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { formProps, saveButtonProps } = useForm<IStore>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
            >
                <Form.Item
                    label={t("stores:fields.title")}
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
                    label={t("stores:fields.isActive")}
                    name="isActive"
                    valuePropName="checked"
                >
                    <Checkbox>{t("stores:fields.isActive")}</Checkbox>
                </Form.Item>
            </Form>
        </Create>
    );
};
