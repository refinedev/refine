import { useEffect } from "react";

import { useModalForm, useSelect } from "@refinedev/antd";
import { HttpError, useNavigation } from "@refinedev/core";

import { DollarOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";

import { SelectOptionWithAvatar } from "@/components";
import { Company, Deal, User } from "@/interfaces";

type FormValues = {
    stageId?: string | null;
    companyId?: string;
    dealContactId?: string;
    dealOwnerId?: string;
    title?: string;
    contactName?: string;
    contactEmail?: string;
    value?: number;
};

export const SalesEditPage = () => {
    const { list } = useNavigation();

    const { formProps, modalProps, close, queryResult } = useModalForm<
        Deal,
        HttpError,
        FormValues
    >({
        action: "edit",
        defaultVisible: true,
        meta: {
            fields: [
                "title",
                "stageId",
                "value",
                "dealOwnerId",
                { company: ["id"] },
                { dealContact: ["id"] },
            ],
        },
    });

    const { selectProps, queryResult: companyQueryResult } = useSelect<Company>(
        {
            resource: "companies",
            meta: {
                fields: [
                    "name",
                    "id",
                    "avatarUrl",
                    { contacts: [{ nodes: ["name", "id", "avatarUrl"] }] },
                ],
            },
            optionLabel: "name",
        },
    );

    const { selectProps: stageSelectProps } = useSelect({
        resource: "dealStages",
        meta: {
            fields: ["title", "id"],
        },
    });

    const { queryResult: userQueryResult } = useSelect<User>({
        resource: "users",
        meta: {
            fields: ["name", "id", "avatarUrl"],
        },
        optionLabel: "name",
    });

    const company = Form.useWatch("company", formProps.form);
    const companyId = company?.id;

    useEffect(() => {
        const initialCompanyId = queryResult?.data?.data?.company?.id;
        if (initialCompanyId !== companyId) {
            formProps.form?.setFieldValue(["dealContact", "id"], undefined);
        }
    }, [companyId]);

    const renderContactForm = () => {
        if (companyQueryResult.isLoading) {
            return null;
        }

        const selectedCompany = companyQueryResult.data?.data?.find(
            (company) => company.id === companyId,
        );

        const hasContact =
            selectedCompany?.contacts?.nodes?.length !== undefined &&
            selectedCompany.contacts.nodes.length > 0;

        if (hasContact) {
            const options = selectedCompany?.contacts?.nodes?.map(
                (contact) => ({
                    label: (
                        <SelectOptionWithAvatar
                            name={contact.name}
                            avatarUrl={contact.avatarUrl ?? undefined}
                        />
                    ),
                    value: contact.id,
                }),
            );

            return (
                <Form.Item
                    label="Deal contact"
                    name={["dealContact", "id"]}
                    rules={[{ required: true }]}
                >
                    <Select options={options} />
                </Form.Item>
            );
        }

        return null;
    };

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                list("deals", "replace");
            }}
            title="Edit deal"
            width={512}
        >
            <Form
                {...formProps}
                layout="vertical"
                preserve={false}
                onFinish={(values) => {
                    const val = values as Deal;

                    formProps.onFinish?.({
                        title: val.title,
                        value: val.value || 0,
                        dealOwnerId: val.dealOwnerId,
                        stageId: val.stageId,
                        companyId: val.company?.id,
                        dealContactId: val.dealContact?.id,
                    });
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
                    name={["company", "id"]}
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Please select company"
                        {...selectProps}
                        options={
                            companyQueryResult.data?.data?.map((company) => ({
                                value: company.id,
                                label: (
                                    <SelectOptionWithAvatar
                                        name={company.name}
                                        shape="square"
                                        avatarUrl={
                                            company.avatarUrl ?? undefined
                                        }
                                    />
                                ),
                            })) ?? []
                        }
                    />
                </Form.Item>
                {renderContactForm()}
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Stage" name="stageId">
                            <Select
                                placeholder="Please select stage"
                                {...stageSelectProps}
                                showSearch={false}
                                options={stageSelectProps.options?.concat({
                                    label: "UNASSIGNED",
                                    value: null,
                                })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Deal value" name="value">
                            <InputNumber
                                min={0}
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
                    <Select
                        placeholder="Please select user"
                        {...selectProps}
                        options={
                            userQueryResult.data?.data?.map((user) => ({
                                value: user.id,
                                label: (
                                    <SelectOptionWithAvatar
                                        name={user.name}
                                        avatarUrl={user.avatarUrl ?? undefined}
                                    />
                                ),
                            })) ?? []
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
