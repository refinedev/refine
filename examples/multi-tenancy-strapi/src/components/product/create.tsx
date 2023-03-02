import { useApiUrl } from "@pankod/refine-core";

import {
    Create,
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Upload,
    Grid,
} from "@pankod/refine-antd";

import { StoreContext } from "context/store";
import { useContext } from "react";

import {
    useStrapiUpload,
    mediaUploadMapper,
    getValueProps,
} from "@pankod/refine-strapi-v4";

import { TOKEN_KEY } from "../../constants";

type CreateProductProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const CreateProduct: React.FC<CreateProductProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const API_URL = useApiUrl();
    const [store] = useContext(StoreContext);

    const breakpoint = Grid.useBreakpoint();

    const { ...uploadProps } = useStrapiUpload({
        maxCount: 1,
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
        >
            <Create saveButtonProps={saveButtonProps}>
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                    }}
                    onFinish={(values) => {
                        return formProps.onFinish?.({
                            ...mediaUploadMapper(values),
                            stores: store,
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
                    <Form.Item label="Image">
                        <Form.Item
                            name="image"
                            valuePropName="fileList"
                            getValueProps={(data) =>
                                getValueProps(data, API_URL)
                            }
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload.Dragger
                                name="files"
                                action={`${API_URL}/upload`}
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
            </Create>
        </Drawer>
    );
};
