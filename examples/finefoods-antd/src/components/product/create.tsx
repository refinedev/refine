import { useTranslate, useApiUrl } from "@pankod/refine-core";

import {
    Create,
    DrawerProps,
    Form,
    FormProps,
    Input,
    InputNumber,
    Radio,
    Select,
    Space,
    ButtonProps,
    Avatar,
    Typography,
    Upload,
    Grid,
    getValueFromEvent,
    useSelect,
} from "@pankod/refine-antd";

const { Text } = Typography;

import { ICategory } from "interfaces";
import { Drawer } from "./styled";

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
    const t = useTranslate();
    const apiUrl = useApiUrl();
    const breakpoint = Grid.useBreakpoint();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
            zIndex={1001}
        >
            <Create resource="products" saveButtonProps={saveButtonProps}>
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                    }}
                >
                    <Form.Item label={t("products.fields.images.label")}>
                        <Form.Item
                            name="images"
                            valuePropName="fileList"
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload.Dragger
                                name="file"
                                action={`${apiUrl}/media/upload`}
                                listType="picture"
                                maxCount={1}
                                accept=".png"
                            >
                                <Space direction="vertical" size={2}>
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
                                            "products.fields.images.description",
                                        )}
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        {t("products.fields.images.validation")}
                                    </Text>
                                </Space>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label={t("products.fields.name")}
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
                        label={t("products.fields.description")}
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
                        label={t("products.fields.price")}
                        name="price"
                        rules={[
                            {
                                required: true,
                                type: "number",
                            },
                        ]}
                    >
                        <InputNumber
                            formatter={(value) => `$ ${value}`}
                            style={{ width: "150px" }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t("products.fields.category")}
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
                        label={t("products.fields.isActive")}
                        name="isActive"
                    >
                        <Radio.Group>
                            <Radio value={true}>{t("status.enable")}</Radio>
                            <Radio value={false}>{t("status.disable")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Create>
        </Drawer>
    );
};
