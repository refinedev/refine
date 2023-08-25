import { useModalForm, useSelect } from "@refinedev/antd";
import { HttpError, RedirectAction, useGetToPath } from "@refinedev/core";
import { Form, Input, Modal, Select, Spin } from "antd";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Quote,
    QuoteCreateInput,
    QuoteUpdateInput,
} from "../../interfaces/graphql";

type Props = {
    action: "create" | "edit";
    redirect?: RedirectAction;
    onMutationSuccess?: () => void;
    onCancel?: () => void;
};

export const QuotesFormModal: FC<Props> = ({
    action,
    redirect,
    onCancel,
    onMutationSuccess,
}) => {
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    const { formProps, modalProps, close, onFinish } = useModalForm<
        Quote,
        HttpError,
        QuoteCreateInput | QuoteUpdateInput
    >({
        resource: "quotes",
        action,
        id: params.id,
        defaultVisible: true,
        redirect,
        meta: {
            fields: [
                "id",
                "title",
                {
                    salesOwner: ["id", "name"],
                },
                {
                    company: ["id", "name"],
                },
                {
                    contact: ["id", "name"],
                },
            ],
        },
        onMutationSuccess: () => {
            onMutationSuccess?.();
        },
    });

    const handleOnFinish = (values: Quote) => {
        const { company, salesOwner, contact, ...rest } = values;

        onFinish({
            ...rest,
            companyId: company?.id,
            salesOwnerId: salesOwner?.id,
            contactId: contact?.id,
        });
    };

    const {
        selectProps: selectPropsCompanies,
        queryResult: { isLoading: isLoadingCompanies },
    } = useSelect({
        resource: "companies",
        pagination: {
            mode: "off",
        },
        optionLabel: "name",
        optionValue: "id",
        meta: {
            fields: ["id", "name"],
        },
    });

    const {
        selectProps: selectPropsContacts,
        queryResult: { isLoading: isLoadingContact },
    } = useSelect({
        resource: "contacts",
        pagination: {
            mode: "off",
        },
        optionLabel: "name",
        optionValue: "id",
        meta: {
            fields: ["id", "name"],
        },
    });

    const {
        selectProps: selectPropsSalesOwners,
        queryResult: { isLoading: isLoadingSalesOwners },
    } = useSelect({
        resource: "users",
        pagination: {
            mode: "off",
        },
        optionLabel: "name",
        optionValue: "id",
        meta: {
            fields: ["id", "name"],
        },
    });

    const loading =
        isLoadingCompanies || isLoadingContact || isLoadingSalesOwners;

    return (
        <Modal
            {...modalProps}
            confirmLoading={loading}
            width={560}
            onCancel={() => {
                if (onCancel) {
                    onCancel();
                    return;
                }
                //TODO: modalProps.onCancel expect an event so, I used close. Actually both of them are same.
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
        >
            <Spin spinning={loading}>
                <Form
                    {...formProps}
                    onFinish={(values) => {
                        handleOnFinish(values as Quote);
                    }}
                    layout="vertical"
                >
                    <Form.Item
                        rules={[{ required: true }]}
                        name="title"
                        label="Quotes title"
                    >
                        <Input placeholder="Please enter quote title" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true }]}
                        name={["salesOwner", "id"]}
                        label="Sales owner"
                    >
                        <Select
                            {...selectPropsSalesOwners}
                            placeholder="Please select user"
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true }]}
                        name={["company", "id"]}
                        label="Company"
                    >
                        <Select
                            {...selectPropsCompanies}
                            placeholder="Please select company"
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true }]}
                        name={["contact", "id"]}
                        label="Quote Contact"
                    >
                        <Select
                            {...selectPropsContacts}
                            placeholder="Please select contact"
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};
