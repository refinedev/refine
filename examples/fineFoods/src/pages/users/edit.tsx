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
    getValueFromEvent,
} from "@pankod/refine";

import { IUser } from "interfaces";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm<IUser>();
    const apiUrl = useApiUrl();

    return (
        <Edit
            isLoading={queryResult?.isFetching}
            saveButtonProps={saveButtonProps}
        >
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
            >
                <Form.Item
                    label={t("users.fields.firstName")}
                    name="firstName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("users.fields.lastName")}
                    name="lastName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("users.fields.gsm")}
                    name="gsm"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("users.fields.gender")}
                    name="gender"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Male",
                                value: "Male",
                            },
                            {
                                label: "Female",
                                value: "Female",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label={t("users.fields.isActive")}
                    name="isActive"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    valuePropName="checked"
                >
                    <Checkbox>{t("users.fields.isActive")}</Checkbox>
                </Form.Item>
                <Form.Item label={t("users.fields.avatar.label")}>
                    <Form.Item
                        name="avatar"
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
                                {t("users.fields.avatar.description")}
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};
