import {
    IResourceComponentsProps,
    useTranslate,
    useApiUrl,
} from "@pankod/refine-core";

import {
    Form,
    Edit,
    Select,
    Upload,
    Input,
    Button,
    SaveButton,
    Steps,
    getValueFromEvent,
    useStepsForm,
    useSelect,
    Typography,
    Space,
    Avatar,
    Row,
    Col,
    InputProps,
} from "@pankod/refine-antd";

import InputMask from "react-input-mask";

const { Text } = Typography;

import { ICourier, IStore } from "interfaces";

export const CouriersEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        current,
        gotoStep,
        stepsProps,
        formProps,
        saveButtonProps,
        queryResult,
    } = useStepsForm<ICourier>();
    const courierData = queryResult?.data?.data;
    const apiUrl = useApiUrl();

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
        defaultValue: courierData?.store.id,
    });

    const formList = [
        <>
            <Row gutter={20}>
                <Col xs={24} lg={8}>
                    <Form.Item>
                        <Form.Item
                            name="avatar"
                            valuePropName="fileList"
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                        >
                            <Upload.Dragger
                                name="file"
                                action={`${apiUrl}/media/upload`}
                                listType="picture"
                                maxCount={1}
                                multiple
                                style={{
                                    border: "none",
                                    width: "100%",
                                    background: "none",
                                }}
                            >
                                <Space direction="vertical" size={2}>
                                    <Avatar
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "200px",
                                        }}
                                        src="/images/user-default-img.png"
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
                                            "couriers.fields.images.description",
                                        )}
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        {t("couriers.fields.images.validation")}
                                    </Text>
                                </Space>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col xs={24} lg={16}>
                    <Row gutter={10}>
                        <Col xs={24} lg={12}>
                            <Form.Item
                                label={t("couriers.fields.name")}
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
                                label={t("couriers.fields.surname")}
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={t("couriers.fields.gender.label")}
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    options={[
                                        {
                                            label: t(
                                                "couriers.fields.gender.male",
                                            ),
                                            value: "Male",
                                        },
                                        {
                                            label: t(
                                                "couriers.fields.gender.female",
                                            ),
                                            value: "Female",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item
                                label={t("couriers.fields.gsm")}
                                name="gsm"
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
                            </Form.Item>
                            <Form.Item
                                label={t("couriers.fields.email")}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: "email",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label={t("couriers.fields.address")}
                        name="address"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Col>
            </Row>
        </>,
        <Row key="relations" gutter={20}>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("couriers.fields.store")}
                    name={["store", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...storeSelectProps} />
                </Form.Item>
                <Form.Item
                    label={t("couriers.fields.accountNumber")}
                    name="accountNumber"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("couriers.fields.vehicle")}
                    name="licensePlate"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
        </Row>,
    ];

    return (
        <>
            <Edit
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
                headerButtons={
                    <>
                        {current > 0 && (
                            <Button
                                onClick={() => {
                                    gotoStep(current - 1);
                                }}
                            >
                                {t("buttons.previousStep")}
                            </Button>
                        )}
                        {current < formList.length - 1 && (
                            <Button
                                onClick={() => {
                                    gotoStep(current + 1);
                                }}
                            >
                                {t("buttons.nextStep")}
                            </Button>
                        )}
                        {current === formList.length - 1 && (
                            <SaveButton
                                style={{ marginRight: 10 }}
                                {...saveButtonProps}
                            />
                        )}
                    </>
                }
            >
                <Steps {...stepsProps} responsive>
                    <Steps.Step title={t("couriers.steps.content")} />
                    <Steps.Step title={t("couriers.steps.relations")} />
                </Steps>
                <Form
                    {...formProps}
                    style={{ marginTop: 30 }}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                        ...formProps.initialValues,
                    }}
                >
                    {formList[current]}
                </Form>
            </Edit>
        </>
    );
};
