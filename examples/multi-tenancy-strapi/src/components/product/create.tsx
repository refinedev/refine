import { useContext } from "react";
import { Create } from "@refinedev/antd";
import { mediaUploadMapper, getValueProps } from "@refinedev/strapi-v4";
import {
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Upload,
    Grid,
} from "antd";

import { StoreContext } from "context/store";
import { TOKEN_KEY, API_URL } from "../../constants";

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
    const [store] = useContext(StoreContext);

    const breakpoint = Grid.useBreakpoint();

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
        >
            <Create
                saveButtonProps={{
                    ...saveButtonProps,
                    onClick: () => {
                        formProps.form?.submit();
                    },
                }}
            >
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                    }}
                    onFinish={(values) => {
                        formProps.onFinish?.({
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
                                action={`${API_URL}/api/upload`}
                                headers={{
                                    Authorization: `Bearer ${localStorage.getItem(
                                        TOKEN_KEY,
                                    )}`,
                                }}
                                listType="picture"
                                multiple
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
