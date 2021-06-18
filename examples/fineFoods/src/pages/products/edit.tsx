import {
    Edit,
    Form,
    Input,
    Select,
    Checkbox,
    Upload,
    IResourceComponentsProps,
    useForm,
    useTranslate,
    useApiUrl,
    useSelect,
    getValueFromEvent,
} from "@pankod/refine";

import { ICategory, IUser } from "interfaces";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        formProps,
        saveButtonProps,
        queryResult: { isFetching },
    } = useForm<IUser>();

    const apiUrl = useApiUrl();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

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
                    <Checkbox>{t("products:fields.isActive")}</Checkbox>
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
        </Edit>
    );
};
