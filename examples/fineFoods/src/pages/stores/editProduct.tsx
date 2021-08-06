import {
    Edit,
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    Radio,
    Select,
    ButtonProps,
    useTranslate,
    Avatar,
    Typography,
    Upload,
    getValueFromEvent,
    useApiUrl,
    useSelect,
} from "@pankod/refine";

const { Text } = Typography;

import { ICategory } from "interfaces";

type Props = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const EditProduct: React.FC<Props> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const t = useTranslate();
    const apiUrl = useApiUrl();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Drawer {...drawerProps} bodyStyle={{ padding: 0 }}>
            <Edit
                saveButtonProps={saveButtonProps}
                pageHeaderProps={{ extra: null }}
            >
                <Form {...formProps} layout="vertical">
                    <Form.Item label={t("products:fields.images.label")}>
                        <Form.Item
                            name="images"
                            valuePropName="fileList"
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                        >
                            <Upload.Dragger
                                name="file"
                                action={`${apiUrl}/media/upload`}
                                listType="picture"
                                maxCount={1}
                                accept=".png"
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "256px",
                                        }}
                                        src="/images/product-default-img.png"
                                        alt="Store Location"
                                    />
                                    <Text
                                        style={{
                                            fontWeight: 800,
                                            fontSize: "16px",
                                            marginTop: "8px",
                                        }}
                                    >
                                        {t(
                                            "products:fields.images.description",
                                        )}
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        {t("products:fields.images.validation")}
                                    </Text>
                                </div>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label={t("products:fields.name")}
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("products:fields.description")}
                        name="description"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>
                    <Form.Item
                        label={t("products:fields.price")}
                        name="price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("products:fields.category")}
                        name={["category", "id"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select {...categorySelectProps} />
                    </Form.Item>
                    <Form.Item
                        label={t("products:fields.isActive")}
                        name="isActive"
                    >
                        <Radio.Group>
                            <Radio value={true}>{t("status.enable")}</Radio>
                            <Radio value={false}>{t("status.disable")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};
