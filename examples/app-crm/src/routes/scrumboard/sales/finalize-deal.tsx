import { useEffect } from "react";

import { useModalForm } from "@refinedev/antd";
import { HttpError, useInvalidate, useNavigation } from "@refinedev/core";

import { DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";

import { Deal } from "@/graphql/schema.types";

import { SALES_FINALIZE_DEAL_MUTATION } from "./queries";

type FormValues = {
    notes?: string;
    closeDate?: dayjs.Dayjs;
    closeDateMonth?: number;
    closeDateDay?: number;
    closeDateYear?: number;
};

export const SalesFinalizeDeal = () => {
    const invalidate = useInvalidate();
    const { list } = useNavigation();

    const { formProps, modalProps, close, queryResult } = useModalForm<
        Deal,
        HttpError,
        FormValues
    >({
        action: "edit",
        defaultVisible: true,
        meta: {
            gqlMutation: SALES_FINALIZE_DEAL_MUTATION,
        },
        onMutationSuccess: () => {
            invalidate({ invalidates: ["list"], resource: "deals" });
        },
        successNotification: () => {
            return {
                key: "edit-deal",
                type: "success",
                message: "Successfully updated deal",
                description: "Successful",
            };
        },
    });

    useEffect(() => {
        const month =
            queryResult?.data?.data?.closeDateMonth ?? new Date().getMonth();
        const day =
            queryResult?.data?.data?.closeDateDay ?? new Date().getDay();
        const year =
            queryResult?.data?.data?.closeDateYear ?? new Date().getFullYear();

        formProps.form?.setFieldsValue({
            closeDate: dayjs(new Date(year, month - 1, day)),
        });
    }, [queryResult?.data?.data]);

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                list("deals", "replace");
            }}
            title="Add more details"
            width={512}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.({
                        notes: values.notes,
                        closeDateDay: dayjs(values.closeDate).get("date"),
                        closeDateMonth:
                            dayjs(values.closeDate).get("month") + 1,
                        closeDateYear: dayjs(values.closeDate).get("year"),
                    });
                }}
            >
                <Form.Item
                    label="Notes"
                    name="notes"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item
                    label="Closed date"
                    name="closeDate"
                    rules={[{ required: true }]}
                    getValueProps={(value) => {
                        if (!value) return { value: undefined };
                        return { value: value };
                    }}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};
