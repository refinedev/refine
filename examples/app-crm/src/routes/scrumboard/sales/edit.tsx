import { useEffect } from "react";
import { HttpError, useGetToPath } from "@refinedev/core";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { DollarOutlined } from "@ant-design/icons";

import { Company, Deal } from "../../../interfaces/graphql";

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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    const { formProps, modalProps, close } = useModalForm<
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

    useEffect(() => {
        if (searchParams.get("stageId")) {
            formProps.form?.setFieldsValue({
                stageId: searchParams.get("stageId"),
            });
        }
    }, [searchParams]);

    const { selectProps } = useSelect<Company>({
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
    stageSelectProps.options?.concat({
        label: "Unassigned",
        value: null,
    });

    const { selectProps: contactSelectProps } = useSelect({
        resource: "contacts",
        meta: {
            fields: ["name", "id"],
        },
        optionLabel: "name",
    });

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
            title="Edit deal"
            width={512}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    const val = values as Deal;

                    formProps.onFinish?.({
                        title: val.title,
                        value: val.value,
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
                    <Select placeholder="Please select user" {...selectProps} />
                </Form.Item>
                <Form.Item
                    label="Deal contact"
                    name={["dealContact", "id"]}
                    rules={[{ required: true }]}
                >
                    <Select {...contactSelectProps} />
                </Form.Item>
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
