import { useTranslate } from "@refinedev/core";
import { ListButton, SaveButton, useForm, useSelect } from "@refinedev/antd";
import {
    Card,
    Col,
    Divider,
    Flex,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from "antd";
import InputMask from "react-input-mask";

import { ICourier } from "../../interfaces";
import {
    BikeWhiteIcon,
    CourierFormItemAvatar,
    CourierReviewTable,
    CourierStatus,
    FormItemHorizontal,
} from "../../components";
import {
    BankOutlined,
    LeftOutlined,
    MailOutlined,
    PhoneOutlined,
    RightCircleOutlined,
    ScanOutlined,
    ShopOutlined,
} from "@ant-design/icons";

export const CourierEdit = () => {
    const t = useTranslate();
    const { formProps, queryResult, saveButtonProps } = useForm<ICourier>({
        redirect: false,
    });
    const courier = queryResult?.data?.data;

    const { selectProps: storeSelectProps } = useSelect({
        resource: "stores",
        defaultValue: courier?.store.id,
        queryOptions: {
            enabled: !!courier,
        },
    });

    const { selectProps: vehicleSelectProps } = useSelect({
        resource: "vehicles",
        defaultValue: courier?.vehicle.id,
        optionLabel: "model",
        optionValue: "id",
        queryOptions: {
            enabled: !!courier,
        },
    });

    return (
        <>
            <Flex>
                <ListButton icon={<LeftOutlined />}>
                    {t("couriers.couriers")}
                </ListButton>
            </Flex>
            <Divider />

            <Row gutter={16}>
                <Col span={9}>
                    <Form {...formProps} layout="horizontal">
                        <Flex align="center" gap={24}>
                            <CourierFormItemAvatar formProps={formProps} />
                            <Form.Item
                                name="name"
                                style={{ width: "100%", marginBottom: "0" }}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={t(
                                        "couriers.fields.name.placeholder",
                                    )}
                                />
                            </Form.Item>
                        </Flex>
                        <Card
                            style={{
                                marginTop: "16px",
                            }}
                            styles={{
                                body: {
                                    padding: 0,
                                },
                            }}
                        >
                            <FormItemHorizontal
                                isInput={false}
                                icon={<RightCircleOutlined />}
                                label={t("couriers.fields.status.label")}
                            >
                                <CourierStatus
                                    isLoading={queryResult?.isLoading}
                                    value={
                                        courier?.status || {
                                            id: 3,
                                            text: "Offline",
                                        }
                                    }
                                />
                            </FormItemHorizontal>
                            <FormItemHorizontal
                                name="gsm"
                                icon={<PhoneOutlined />}
                                label={t("couriers.fields.gsm.label")}
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
                                    {(props: InputProps) => (
                                        <Input {...props} />
                                    )}
                                </InputMask>
                            </FormItemHorizontal>
                            <FormItemHorizontal
                                icon={<MailOutlined />}
                                label={t("couriers.fields.email.label")}
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
                            <FormItemHorizontal
                                icon={<MailOutlined />}
                                label={t("couriers.fields.address.label")}
                                name="address"
                                flexProps={{
                                    align: "flex-start",
                                }}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.TextArea rows={2} />
                            </FormItemHorizontal>
                            <FormItemHorizontal
                                icon={<BankOutlined />}
                                label={t("couriers.fields.accountNumber.label")}
                                name="accountNumber"
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
                                />
                            </FormItemHorizontal>
                            <FormItemHorizontal
                                icon={<ShopOutlined />}
                                label={t("couriers.fields.store.label")}
                                name={["store", "id"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select {...storeSelectProps} />
                            </FormItemHorizontal>
                            <FormItemHorizontal
                                icon={<BikeWhiteIcon />}
                                label={t("couriers.fields.vehicle.label")}
                                name={["vehicle", "id"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select {...vehicleSelectProps} />
                            </FormItemHorizontal>
                            <FormItemHorizontal
                                icon={<ScanOutlined />}
                                label={t("couriers.fields.licensePlate.label")}
                                name="licensePlate"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </FormItemHorizontal>
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
                    </Form>
                </Col>
                <Col
                    span={15}
                    style={{
                        marginTop: "88px",
                    }}
                >
                    <CourierReviewTable courier={courier} />
                </Col>
            </Row>
        </>
    );
};
