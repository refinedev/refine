import {
    Create,
    Form,
    Input,
    Select,
    Upload,
    IResourceComponentsProps,
    useForm,
    useTranslate,
    useApiUrl,
    useSelect,
    getValueFromEvent,
    Checkbox,
} from "@pankod/refine";

import { ICategory, IUser } from "interfaces";

export const ProductCreate: React.FC<IResourceComponentsProps> = (props) => {
    const t = useTranslate();
    const { formProps, saveButtonProps } = useForm<IUser>();

    const apiUrl = useApiUrl();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={t("products:fields.name")}
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("products:fields.description")}
                    name="description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label={t("products:fields.isActive")}
                    name="isActive"
                    valuePropName="checked"
                >
                    <Checkbox value={true}>
                        {t("products:fields.isActive")}
                    </Checkbox>
                </Form.Item>
                <Form.Item
                    label={t("products:fields.price")}
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t("products:fields.category")}
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>

                <Form.Item label={t("products:fields.images.label")}>
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                        >
                            <p className="ant-upload-text">
                                {t("products:fields:images.description")}
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};
