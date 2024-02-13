import { UseFormProps, useNavigation, useTranslate } from "@refinedev/core";
import {
    DeleteButton,
    ListButton,
    SaveButton,
    UseFormReturnType,
} from "@refinedev/antd";
import {
    Form,
    Input,
    Typography,
    InputProps,
    Segmented,
    Card,
    Flex,
    Divider,
    InputNumber,
    theme,
} from "antd";
import InputMask from "react-input-mask";
import _debounce from "lodash/debounce";
import { IStore } from "../../../interfaces";
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    RightCircleOutlined,
} from "@ant-design/icons";
import { FormItemHorizontal } from "../../form";

type Props = {
    formProps: UseFormReturnType<IStore>["formProps"];
    saveButtonProps: UseFormReturnType<IStore>["saveButtonProps"];
    action: UseFormProps["action"];
    handleAddressChange: (address: string) => void;
};

export const StoreFormFields = ({
    formProps,
    saveButtonProps,
    action,
    handleAddressChange,
}: Props) => {
    const { token } = theme.useToken();
    const t = useTranslate();
    const { list } = useNavigation();

    return (
        <Form {...formProps} layout="horizontal">
            <Form.Item
                name="title"
                style={{
                    marginBottom: "32px",
                }}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder={t("stores.fields.title")} />
            </Form.Item>
            <Card
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <FormItemHorizontal
                    name="isActive"
                    initialValue={true}
                    icon={<RightCircleOutlined />}
                    label={t("stores.fields.isActive.label")}
                >
                    <Segmented
                        options={[
                            {
                                label: t("stores.fields.isActive.true"),
                                value: true,
                            },
                            {
                                label: t("stores.fields.isActive.false"),
                                value: false,
                            },
                        ]}
                    />
                </FormItemHorizontal>
                <Divider
                    style={{
                        margin: 0,
                    }}
                />
                <FormItemHorizontal
                    icon={<MailOutlined />}
                    label={t("stores.fields.email")}
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                        },
                    ]}
                >
                    <Input />
                </FormItemHorizontal>
                <Divider
                    style={{
                        margin: 0,
                    }}
                />
                <FormItemHorizontal
                    name={["address", "text"]}
                    icon={<EnvironmentOutlined />}
                    label={t("stores.fields.address")}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={2}
                        onChange={(e) => {
                            handleAddressChange(e.target.value);
                        }}
                    />
                </FormItemHorizontal>
                <Divider
                    style={{
                        margin: 0,
                    }}
                />
                <FormItemHorizontal
                    name="gsm"
                    icon={<PhoneOutlined />}
                    label={t("stores.fields.gsm")}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputMask mask="(999) 999 99 99">
                        {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
                        {(props: InputProps) => <Input {...props} />}
                    </InputMask>
                </FormItemHorizontal>
            </Card>
            <Flex
                align="center"
                justify="space-between"
                style={{
                    padding: "16px 16px 0px 16px",
                }}
            >
                {action === "create" && (
                    <ListButton icon={false}>{t("actions.cancel")}</ListButton>
                )}
                {action === "edit" && (
                    <DeleteButton
                        type="text"
                        onSuccess={() => {
                            list("stores");
                        }}
                        style={{
                            marginLeft: "-16px",
                        }}
                    />
                )}
                <SaveButton
                    {...saveButtonProps}
                    style={{
                        marginLeft: "auto",
                    }}
                    htmlType="submit"
                    type="primary"
                    icon={null}
                >
                    Save
                </SaveButton>
            </Flex>

            {/* this is a workaround for registering fields to ant design form*/}
            {/* otherwise these fields will be null */}
            <Flex
                vertical
                style={{
                    display: "none",
                }}
            >
                <Form.Item
                    name={["address", "coordinate", 0]}
                    style={{
                        display: "none",
                    }}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: "100%",
                        }}
                        addonBefore="Lat"
                    />
                </Form.Item>
                <Form.Item
                    style={{
                        display: "none",
                    }}
                    name={["address", "coordinate", 1]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        addonBefore="Lng"
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>
            </Flex>
        </Form>
    );
};
