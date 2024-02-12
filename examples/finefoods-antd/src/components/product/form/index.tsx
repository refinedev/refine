import { DeleteButton, SaveButton, useDrawerForm } from "@refinedev/antd";
import {
    BaseKey,
    useApiUrl,
    useGetToPath,
    useGo,
    useTranslate,
} from "@refinedev/core";
import { getValueFromEvent, useSelect } from "@refinedev/antd";
import {
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Upload,
    Grid,
    Button,
    Flex,
    Avatar,
} from "antd";
import { IProduct, ICategory } from "../../../interfaces";
import { useSearchParams } from "react-router-dom";
import { Drawer } from "../../drawer";
import { UploadOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";

type ProductFormProps = {
    action: "create" | "edit";
    id?: BaseKey;
};

export const ProductForm = (props: ProductFormProps) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const t = useTranslate();
    const apiUrl = useApiUrl();
    const breakpoint = Grid.useBreakpoint();
    const { styles, theme } = useStyles();

    const { drawerProps, formProps, close, saveButtonProps } =
        useDrawerForm<IProduct>({
            action: props.action,
            id: props?.id, // when undefined, id will be read from the URL.
            resource: "products",
            redirect: false,
        });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const onDrawerCLose = () => {
        close();
        go({
            to:
                searchParams.get("to") ??
                getToPath({
                    action: "list",
                }) ??
                "",
            query: {
                to: undefined,
            },
            options: {
                keepQuery: true,
            },
            type: "replace",
        });
    };

    const images = Form.useWatch("images", formProps.form);
    const image = images?.[0] || null;
    const previewImageURL = image?.url || image?.response?.url;
    const title = props.action === "edit" ? null : t("products.actions.add");

    return (
        <Drawer
            {...drawerProps}
            open={true}
            title={title}
            width={breakpoint.sm ? "378px" : "100%"}
            zIndex={1001}
            onClose={onDrawerCLose}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={getValueFromEvent}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Upload.Dragger
                        name="file"
                        action={`${apiUrl}/media/upload`}
                        maxCount={1}
                        accept=".png"
                        className={styles.uploadDragger}
                        showUploadList={false}
                    >
                        <Flex
                            vertical
                            align="center"
                            justify="center"
                            style={{
                                height: "100%",
                            }}
                        >
                            <Avatar
                                shape="square"
                                style={{
                                    aspectRatio: 1,
                                    objectFit: "contain",
                                    width: previewImageURL ? "100%" : "48px",
                                    height: previewImageURL ? "100%" : "48px",
                                    marginTop: previewImageURL
                                        ? undefined
                                        : "auto",
                                    transform: previewImageURL
                                        ? undefined
                                        : "translateY(50%)",
                                }}
                                src={
                                    previewImageURL ||
                                    "/images/product-default-img.png"
                                }
                                alt="Product Image"
                            />
                            {!previewImageURL && (
                                <Button
                                    icon={<UploadOutlined />}
                                    style={{
                                        marginTop: "auto",
                                        marginBottom: "16px",
                                        backgroundColor: theme.colorBgElevated,
                                    }}
                                >
                                    {t("products.fields.images.description")}
                                </Button>
                            )}
                        </Flex>
                    </Upload.Dragger>
                </Form.Item>
                <Flex
                    vertical
                    style={{
                        padding: "16px",
                    }}
                >
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
                            },
                        ]}
                    >
                        <InputNumber prefix={"$"} style={{ width: "150px" }} />
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
                        label={t("products.fields.isActive.label")}
                        name="isActive"
                        initialValue={true}
                    >
                        <Radio.Group>
                            <Radio value={true}>{t("status.enable")}</Radio>
                            <Radio value={false}>{t("status.disable")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Flex align="center" justify="space-between">
                        {props.action === "create" && (
                            <Button onClick={onDrawerCLose}>Cancel</Button>
                        )}
                        {props.action === "edit" && (
                            <DeleteButton
                                type="text"
                                onSuccess={() => {
                                    onDrawerCLose();
                                }}
                            />
                        )}
                        <SaveButton
                            {...saveButtonProps}
                            htmlType="submit"
                            type="primary"
                            icon={null}
                        >
                            Save
                        </SaveButton>
                    </Flex>
                </Flex>
            </Form>
        </Drawer>
    );
};
