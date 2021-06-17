import {
    Edit,
    Form,
    Input,
    Select,
    Radio,
    Upload,
    IResourceComponentsProps,
    useForm,
    useTranslate,
    getValueFromEvent,
    useApiUrl,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IUser } from "interfaces";

export const UserEdit: React.FC<IResourceComponentsProps> = (props) => {
    const t = useTranslate();
    const { formProps, saveButtonProps } = useForm<IUser>();
    const apiUrl = useApiUrl();

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={t("users:fields.firstName")}
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
                    label={t("users:fields.lastName")}
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
                    label={t("users:fields.gsm")}
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
                    label={t("users:fields.gender")}
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
                    label={t("users:fields.isActive")}
                    name="isActive"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio value={true}>{t("users:fields.isActive")}</Radio>
                </Form.Item>
                <Form.Item label={t("users:fields.avatar.label")}>
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
                                {t("users:fields:avatar.description")}
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};
