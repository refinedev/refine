import {
    Form,
    Create,
    Select,
    Upload,
    Input,
    IResourceComponentsProps,
    Button,
    SaveButton,
    Steps,
    useTranslate,
    useApiUrl,
    getValueFromEvent,
    useStepsForm,
} from "@pankod/refine";

import { ICourier } from "interfaces";

export const CouriersCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        current,
        gotoStep,
        stepsProps,
        formProps,
        saveButtonProps,
        queryResult,
    } = useStepsForm<ICourier>();
    const apiUrl = useApiUrl();

    const formList = [
        <>
            <Form.Item
                label={t("couriers:fields.name")}
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
                label={t("couriers:fields.surname")}
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
                label={t("couriers:fields.gsm")}
                name="gsm"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={t("couriers:fields.email")}
                name="email"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={t("couriers:fields.gender")}
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
                            label: "Male",
                            value: "Male",
                        },
                        {
                            label: "Female",
                            value: "Female",
                        },
                    ]}
                />
            </Form.Item>
        </>,
        <>
            <Form.Item label={t("couriers:fields.avatar.label")}>
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
                        maxCount={5}
                        multiple
                    >
                        <p className="ant-upload-text">
                            {t("couriers:fields:avatar.description")}
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
            <Form.Item
                label={t("couriers:fields.address")}
                name="address"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>,
    ];

    return (
        <>
            <Create
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
                actionButtons={
                    <>
                        {current > 0 && (
                            <Button
                                onClick={() => {
                                    gotoStep(current - 1);
                                }}
                            >
                                Previous
                            </Button>
                        )}
                        {current < formList.length - 1 && (
                            <Button
                                onClick={() => {
                                    gotoStep(current + 1);
                                }}
                            >
                                Next
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
                <Steps {...stepsProps}>
                    <Steps.Step title="Content" />
                    <Steps.Step title="Relations" />
                </Steps>
                <Form
                    {...formProps}
                    style={{ marginTop: 30 }}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                    }}
                >
                    {formList[current]}
                </Form>
            </Create>
        </>
    );
};
