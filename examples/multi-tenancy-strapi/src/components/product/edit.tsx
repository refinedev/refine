import {
    Modal,
    Form,
    Input,
    ModalProps,
    FormProps,
    Upload,
} from "@pankod/refine-antd";

import {
    useStrapiUpload,
    getValueProps,
    mediaUploadMapper,
} from "@pankod/refine-strapi-v4";

import { TOKEN_KEY, API_URL } from "../../constants";

type EditProductProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditProduct: React.FC<EditProductProps> = ({
    modalProps,
    formProps,
}) => {
    const { ...uploadProps } = useStrapiUpload({
        maxCount: 1,
    });

    return (
        <Modal {...modalProps}>
            <Form
                {...formProps}
                wrapperCol={{ span: 12 }}
                layout="vertical"
                onFinish={(values) => {
                    return formProps.onFinish?.(mediaUploadMapper(values));
                }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Image">
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps(data, API_URL)}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="files"
                            action={`${API_URL}/api/upload`}
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem(
                                    TOKEN_KEY,
                                )}`,
                            }}
                            listType="picture"
                            multiple
                            {...uploadProps}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Modal>
    );
};
