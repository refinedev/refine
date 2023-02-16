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

type EditCompanyProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditCompany: React.FC<EditCompanyProps> = ({
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
                    console.log(values);
                    return formProps.onFinish?.({
                        ...mediaUploadMapper(values),
                    });
                }}
            >
                <Form.Item
                    label="Company Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Company Address" name="address">
                    <Input />
                </Form.Item>
                <Form.Item label="Company Country" name="country">
                    <Input />
                </Form.Item>
                <Form.Item label="Company City" name="city">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Website" name="website">
                    <Input />
                </Form.Item>
                <Form.Item label="Company Logo">
                    <Form.Item
                        name={"logo"}
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
