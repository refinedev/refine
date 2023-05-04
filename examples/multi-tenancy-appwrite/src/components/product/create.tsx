import { Form, FormProps, Input, Upload, ModalProps, Modal } from "antd";
import { Permission, Role } from "@refinedev/appwrite";
import { useParsed } from "@refinedev/core";
import { RcFile } from "antd/lib/upload/interface";

import { normalizeFile, storage } from "utility";

type CreateProductProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const CreateProduct: React.FC<CreateProductProps> = ({
    modalProps,
    formProps,
}) => {
    const { params } = useParsed<{ tenant?: string }>();
    return (
        <Modal {...modalProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
                onFinish={(values) =>
                    formProps.onFinish?.({
                        ...values,
                        storeId: params?.tenant,
                        image: JSON.stringify(values.image),
                    })
                }
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
                                        [Permission.read(Role.any())],
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
