import React from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    Radio,
    Upload,
    useForm,
    useBase64Upload,
    normalizeFile,
    UploadedFile,
} from "@pankod/refine";

import { IUser } from "../../interfaces";

export const UserEdit = (props: IResourceComponentsProps) => {
    const [avatar, setAvatar] = React.useState<UploadedFile[]>([]);
    const { form, formProps, saveButtonProps, queryResult } = useForm<IUser>();

    const { uploadedFiles, ...uploadProps } = useBase64Upload({
        maxCount: 1,
        formData: avatar,
    });

    React.useEffect(() => {
        if (queryResult?.data) {
            const { data } = queryResult;
            setAvatar(data.data.avatar);
        }
    }, [queryResult]);

    React.useEffect(() => {
        form &&
            form.setFieldsValue({
                avatar: uploadedFiles,
            });
    }, [uploadedFiles]);

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 24 }} layout="vertical">
                <Form.Item
                    label="First Name"
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
                    label="Last Name"
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="avatar">
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            listType="picture"
                            multiple
                            {...uploadProps}
                        >
                            <p className="ant-upload-text">Title</p>
                            <p className="ant-upload-hint">Upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};
