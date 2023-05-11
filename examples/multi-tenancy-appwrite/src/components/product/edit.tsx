import { RcFile } from "antd/lib/upload/interface";
import { Modal, Form, Input, ModalProps, FormProps, Upload } from "antd";

import { normalizeFile, storage } from "utility";
import { useParsed } from "@refinedev/core";

type EditProductProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditProduct: React.FC<EditProductProps> = ({
    modalProps,
    formProps,
}) => {
    const { params } = useParsed<{ tenant?: string }>();
    return (
        <Modal {...modalProps}>
            <Form
                {...formProps}
                wrapperCol={{ span: 12 }}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.({
                        ...values,
                        storeId: params?.tenant,
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

                                    const { $id } = await storage.createFile(
                                        "default",
                                        rcFile.name,
                                        rcFile,
                                        ["role:all"],
                                    );

                                    const url = storage.getFileView(
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
