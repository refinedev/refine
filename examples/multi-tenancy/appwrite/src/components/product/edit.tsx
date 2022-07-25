import {
    Modal,
    Form,
    Input,
    ModalProps,
    FormProps,
    Upload,
    RcFile,
} from "@pankod/refine-antd";

import { appwriteClient, normalizeFile } from "utility";

type EditProductProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditProduct: React.FC<EditProductProps> = ({
    modalProps,
    formProps,
}) => {
    return (
        <Modal {...modalProps}>
            <Form
                {...formProps}
                wrapperCol={{ span: 12 }}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.({
                        ...values,
                        image: JSON.stringify(values.image),
                    });
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
                <Form.Item label="Images">
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        normalize={normalizeFile}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            customRequest={async ({
                                file,
                                onError,
                                onSuccess,
                            }) => {
                                try {
                                    const rcFile = file as RcFile;

                                    const { $id } =
                                        await appwriteClient.storage.createFile(
                                            "default",
                                            rcFile.name,
                                            rcFile,
                                            ["role:all"],
                                            ["role:all"],
                                        );

                                    const url =
                                        appwriteClient.storage.getFileView(
                                            "default",
                                            $id,
                                        );

                                    onSuccess?.({ url }, new XMLHttpRequest());
                                } catch (error) {
                                    onError?.(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag &amp; drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Modal>
    );
};
