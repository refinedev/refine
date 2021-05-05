import React from "react";
import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    Upload,
    useForm,
    useBase64Upload,
    normalizeFile,
} from "@pankod/refine";

// import { IPost, ICategory } from "../../interfaces";

export const UserCreate = (props: IResourceComponentsProps) => {
    const { form, formProps, saveButtonProps } = useForm();

    const { uploadedFiles, ...uploadProps } = useBase64Upload({
        maxCount: 3,
    });

    React.useEffect(() => {
        form &&
            form.setFieldsValue({
                base64Images: uploadedFiles,
            });
    }, [uploadedFiles]);

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
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
        </Create>
    );
};
