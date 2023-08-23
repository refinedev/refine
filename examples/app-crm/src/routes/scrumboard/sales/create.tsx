import { useEffect } from "react";
import {
    HttpError,
    useCreate,
    useGetIdentity,
    useGetToPath,
} from "@refinedev/core";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { DollarOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { Company, Contact, Deal, User } from "../../../interfaces/graphql";

type FormValues = {
    stageId?: string | null;
    companyId?: string;
    dealContactId?: string;
    dealOwnerId?: string;
    title?: string;
    contactName?: string;
    contactEmail?: string;
};

export const SalesCreatePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    const { formProps, modalProps, close } = useModalForm<
        Deal,
        HttpError,
        FormValues
    >({
        action: "create",
        defaultVisible: true,
    });

    useEffect(() => {
        if (searchParams.get("stageId")) {
            formProps.form?.setFieldsValue({
                stageId: searchParams.get("stageId"),
            });
        }
    }, [searchParams]);

    const { selectProps, queryResult } = useSelect<Company>({
        resource: "companies",
        meta: {
            fields: ["name", "id", { contacts: [{ nodes: ["name", "id"] }] }],
        },
        optionLabel: "name",
    });

    const { selectProps: stageSelectProps } = useSelect({
        resource: "dealStages",
        meta: {
            fields: ["title", "id"],
        },
    });

    const { data: user } = useGetIdentity<User>();

    const { mutateAsync: createMutateAsync } = useCreate<Contact>();

    const companyId = Form.useWatch("companyId", formProps.form);

    useEffect(() => {
        formProps.form?.setFieldValue("dealContactId", undefined);
    }, [companyId]);

    const renderContactForm = () => {
        if (!companyId) {
            return null;
        }

        const selectedCompany = queryResult.data?.data?.find(
            (company) => company.id === companyId,
        );

        const hasContact =
            selectedCompany?.contacts?.nodes?.length !== undefined &&
            selectedCompany.contacts.nodes.length > 0;

        if (hasContact) {
            const options = selectedCompany?.contacts?.nodes?.map(
                (contact) => ({
                    label: contact.name,
                    value: contact.id,
                }),
            );

            return (
                <Form.Item
                    label="Deal contact"
                    name="dealContactId"
                    rules={[{ required: true }]}
                >
                    <Select options={options} />
                </Form.Item>
            );
        }

        return (
            <Row gutter={12}>
                <Col span={12}>
                    <Form.Item
                        label="Contact name"
                        name="contactName"
                        rules={[{ required: true }]}
                    >
                        <Input
                            addonBefore={<UserOutlined />}
                            placeholder="Please enter contact name"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Contact email"
                        name="contactEmail"
                        rules={[{ required: true }]}
                    >
                        <Input
                            addonBefore={<MailOutlined />}
                            placeholder="Please enter contact email"
                        />
                    </Form.Item>
                </Col>
            </Row>
        );
    };

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            title="Add new deal"
            width={512}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={async (values) => {
                    if (values.contactName && values.contactEmail) {
                        const { data } = await createMutateAsync({
                            resource: "contacts",
                            values: {
                                name: values.contactName,
                                email: values.contactEmail,
                                salesOwnerId: user?.id,
                                companyId,
                            },
                            meta: {
                                fields: ["id"],
                            },
                        });

                        delete values.contactName;
                        delete values.contactEmail;

                        if (data) {
                            formProps.onFinish?.({
                                ...values,
                                dealContactId: data.id,
                                dealOwnerId: user?.id,
                            });
                        }
                    }
                }}
            >
                <Form.Item
                    label="Deal title"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Please enter deal title" />
                </Form.Item>
                <Form.Item
                    label="Company"
                    name="companyId"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Please select user" {...selectProps} />
                </Form.Item>
                {renderContactForm()}
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Stage" name="stageId">
                            <Select
                                placeholder="Please select stage"
                                {...stageSelectProps}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Deal value" name="value">
                            <InputNumber
                                addonBefore={<DollarOutlined />}
                                placeholder="0,00"
                                formatter={(value) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ",",
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label="Deal owner"
                    name="dealOwnerId"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Please select user" {...selectProps} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
