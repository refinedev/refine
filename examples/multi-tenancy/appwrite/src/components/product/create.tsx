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
    RcFile,
} from "@pankod/refine-antd";

import { appwriteClient, normalizeFile } from "utility";
import { StoreContext } from "context/store";
import { useContext } from "react";

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
    const breakpoint = Grid.useBreakpoint();
    const [store] = useContext(StoreContext);

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
                            ...values,
                            storeId: store,
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

                                        onSuccess?.(
                                            { url },
                                            new XMLHttpRequest(),
                                        );
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
            </Create>
        </Drawer>
    );
};
