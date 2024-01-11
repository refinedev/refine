import { useEffect } from "react";

import { useModalForm, useSelect } from "@refinedev/antd";
import { HttpError, useNavigation } from "@refinedev/core";
import { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query";

import { DollarOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";

import { SelectOptionWithAvatar } from "@/components";
import { DealUpdateInput } from "@/graphql/schema.types";
import {
    SalesCompaniesSelectQuery,
    SalesUpdateDealMutation,
} from "@/graphql/types";
import { useContactsSelect } from "@/hooks/useContactsSelect";
import { useDealStagesSelect } from "@/hooks/useDealStagesSelect";
import { useUsersSelect } from "@/hooks/useUsersSelect";

import {
    SALES_COMPANIES_SELECT_QUERY,
    SALES_UPDATE_DEAL_MUTATION,
} from "./queries";

export const SalesEditPage = () => {
    const { list } = useNavigation();

    const { formProps, modalProps, close, queryResult } = useModalForm<
        GetFields<SalesUpdateDealMutation>,
        HttpError,
        DealUpdateInput
    >({
        action: "edit",
        defaultVisible: true,
        meta: {
            gqlMutation: SALES_UPDATE_DEAL_MUTATION,
        },
    });

    const {
        selectProps: companySelectProps,
        queryResult: companySelectQueryResult,
    } = useSelect<GetFieldsFromList<SalesCompaniesSelectQuery>>({
        resource: "companies",
        optionLabel: "name",
        meta: {
            gqlQuery: SALES_COMPANIES_SELECT_QUERY,
        },
    });

    const { selectProps: stageSelectProps } = useDealStagesSelect();

    const { selectProps: userSelectProps, queryResult: userSelectQueryResult } =
        useUsersSelect();

    const deal = queryResult?.data?.data;

    const companyIdField = Form.useWatch("companyId", formProps.form);

    useEffect(() => {
        if (deal?.company?.id !== companyIdField) {
            formProps.form?.setFieldValue(["dealContactId"], undefined);
        }
    }, [companyIdField]);

    const {
        selectProps: contactSelectProps,
        queryResult: contactsSelectQueryResult,
    } = useContactsSelect({
        filters: [
            {
                field: "company.id",
                operator: "eq",
                value: companyIdField,
            },
        ],
    });

    const renderContactForm = () => {
        if (companySelectQueryResult.isLoading) {
            return null;
        }

        const hasContact =
            deal?.company?.contacts?.nodes?.length !== undefined &&
            deal?.company.contacts.nodes.length > 0;

        if (hasContact) {
            const options = contactsSelectQueryResult?.data?.data?.map(
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
                    name={["dealContactId"]}
                    trigger=""
                    rules={[{ required: true }]}
                    initialValue={deal?.dealContact?.id}
                    dependencies={["companyId"]}
                    preserve={false}
                >
                    <Select {...contactSelectProps} options={options} />
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
            <Form {...formProps} layout="vertical" preserve={false}>
                <Form.Item
                    label="Deal title"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Please enter deal title" />
                </Form.Item>
                <Form.Item
                    label="Company"
                    initialValue={deal?.company?.id}
                    name={["companyId"]}
                    rules={[{ required: true }]}
                    dependencies={["dealContactId"]}
                >
                    <Select
                        placeholder="Please select company"
                        {...companySelectProps}
                        options={
                            companySelectQueryResult.data?.data?.map(
                                (company) => ({
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
                                }),
                            ) ?? []
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
                        {...userSelectProps}
                        options={
                            userSelectQueryResult.data?.data?.map((user) => ({
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
