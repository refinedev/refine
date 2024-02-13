import { useTranslate } from "@refinedev/core";
import { SaveButton, UseFormReturnType } from "@refinedev/antd";
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

type Props = {
    formProps: UseFormReturnType<IStore>["formProps"];
    saveButtonProps: UseFormReturnType<IStore>["saveButtonProps"];
    handleAddressChange: (address: string) => void;
};

export const StoreFormFields = ({
    formProps,
    saveButtonProps,
    handleAddressChange,
}: Props) => {
    const { token } = theme.useToken();
    const t = useTranslate();

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
                <Flex
                    align="baseline"
                    style={{
                        padding: "24px 16px 0px 16px",
                    }}
                >
                    <Flex
                        gap={8}
                        style={{
                            minWidth: "120px",
                        }}
                    >
                        <RightCircleOutlined
                            style={{
                                color: token.colorPrimary,
                            }}
                        />
                        <Typography.Text>
                            {t("stores.fields.isActive.label")}
                        </Typography.Text>
                    </Flex>
                    <Form.Item
                        name="isActive"
                        style={{
                            width: "100%",
                        }}
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
                    </Form.Item>
                </Flex>
                <Divider
                    style={{
                        margin: 0,
                    }}
                />
                <Flex
                    align="baseline"
                    style={{
                        padding: "24px 16px 0px 16px",
                    }}
                >
                    <Flex
                        gap={8}
                        style={{
                            minWidth: "120px",
                        }}
                    >
                        <MailOutlined
                            style={{
                                color: token.colorPrimary,
                            }}
                        />
                        <Typography.Text>
                            {t("stores.fields.email")}
                        </Typography.Text>
                    </Flex>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                            },
                        ]}
                        style={{
                            width: "100%",
                        }}
                    >
                        <Input />
                    </Form.Item>
                </Flex>
                <Divider
                    style={{
                        margin: 0,
                    }}
                />
                <Flex
                    align="flex-start"
                    style={{
                        padding: "24px 16px 0px 16px",
                    }}
                >
                    <Flex
                        gap={8}
                        style={{
                            minWidth: "120px",
                        }}
                    >
                        <EnvironmentOutlined
                            style={{
                                color: token.colorPrimary,
                            }}
                        />
                        <Typography.Text>
                            {t("stores.fields.address")}
                        </Typography.Text>
                    </Flex>
                    <Form.Item
                        name={["address", "text"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            width: "100%",
                        }}
                    >
                        <Input.TextArea
                            rows={2}
                            onChange={(e) => {
                                handleAddressChange(e.target.value);
                            }}
                        />
                    </Form.Item>
                </Flex>
                <Divider
                    style={{
                        margin: 0,
                    }}
                />
                <Flex
                    align="baseline"
                    style={{
                        padding: "24px 16px 0px 16px",
                    }}
                >
                    <Flex
                        gap={8}
                        style={{
                            minWidth: "120px",
                        }}
                    >
                        <PhoneOutlined
                            style={{
                                color: token.colorPrimary,
                            }}
                        />
                        <Typography.Text>
                            {t("stores.fields.gsm")}
                        </Typography.Text>
                    </Flex>
                    <Form.Item
                        name="gsm"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            width: "100%",
                        }}
                    >
                        <InputMask mask="(999) 999 99 99">
                            {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
                            {(props: InputProps) => <Input {...props} />}
                        </InputMask>
                    </Form.Item>
                </Flex>
            </Card>
            <Flex
                align="center"
                justify="space-between"
                style={{
                    padding: "16px 16px 0px 16px",
                }}
            >
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
