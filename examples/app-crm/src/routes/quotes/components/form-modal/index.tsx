import { FC, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { useModalForm, useSelect } from "@refinedev/antd";
import { HttpError, RedirectAction, useNavigation } from "@refinedev/core";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Spin } from "antd";

import { Company, Contact, User } from "@/graphql/schema.types";
import {
    QUOTE_COMPANY_SELECT_QUERY,
    QUOTE_CONTACT_SELECT_QUERY,
    QUOTE_CREATE_MUTATION,
    QUOTE_SALES_OWNER_SELECT_QUERY,
    QUOTE_UPDATE_MUTATION,
} from "./queries";
import {
    QuoteCompanySelectQuery,
    QuoteContactSelectQuery,
    QuoteCreateMutation,
    QuoteCreateMutationVariables,
    QuoteSalesOwnerSelectQuery,
} from "@/graphql/types";
import {
    GetFields,
    GetFieldsFromList,
    GetVariables,
} from "@refinedev/nestjs-query";

type Props = {
    action: "create" | "edit";
    redirect?: RedirectAction;
    onMutationSuccess?: () => void;
    onCancel?: () => void;
};

type QuoteMutationVariables = Partial<
    GetVariables<QuoteCreateMutationVariables> & {
        company?: Partial<Pick<Company, "id">>;
        contact?: Partial<Pick<Contact, "id">>;
        salesOwner?: Partial<Pick<User, "id">>;
    }
>;

export const QuotesFormModal: FC<Props> = ({
    action,
    redirect,
    onCancel,
    onMutationSuccess,
}) => {
    const { pathname } = useLocation();
    const params = useParams<{ id: string }>();
    const { list, replace } = useNavigation();
    const [searchParams] = useSearchParams();

    const { formProps, modalProps, close, onFinish } = useModalForm<
        GetFields<QuoteCreateMutation>,
        HttpError,
        QuoteMutationVariables
    >({
        resource: "quotes",
        action,
        id: params.id,
        defaultVisible: true,
        redirect,
        meta: {
            gqlMutation:
                action === "create"
                    ? QUOTE_CREATE_MUTATION
                    : QUOTE_UPDATE_MUTATION,
        },
        onMutationSuccess: () => {
            onMutationSuccess?.();
        },
    });

    const handleOnFinish = (values: QuoteMutationVariables) => {
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
    } = useSelect<GetFieldsFromList<QuoteCompanySelectQuery>>({
        resource: "companies",
        pagination: {
            mode: "off",
        },
        optionLabel: "name",
        optionValue: "id",
        meta: {
            gqlQuery: QUOTE_COMPANY_SELECT_QUERY,
        },
    });

    const {
        selectProps: selectPropsContacts,
        queryResult: { isLoading: isLoadingContact },
    } = useSelect<GetFieldsFromList<QuoteContactSelectQuery>>({
        resource: "contacts",
        pagination: {
            mode: "off",
        },
        optionLabel: "name",
        optionValue: "id",
        meta: {
            gqlQuery: QUOTE_CONTACT_SELECT_QUERY,
        },
    });

    const {
        selectProps: selectPropsSalesOwners,
        queryResult: { isLoading: isLoadingSalesOwners },
    } = useSelect<GetFieldsFromList<QuoteSalesOwnerSelectQuery>>({
        resource: "users",
        pagination: {
            mode: "off",
        },
        optionLabel: "name",
        optionValue: "id",
        meta: {
            gqlQuery: QUOTE_SALES_OWNER_SELECT_QUERY,
        },
    });

    useEffect(() => {
        const companyId = searchParams.get("companyId");

        if (companyId && companyId !== "null") {
            formProps.form?.setFieldsValue({
                company: {
                    id: companyId,
                },
            });
        }
    }, [searchParams]);

    const loading =
        isLoadingCompanies || isLoadingContact || isLoadingSalesOwners;

    const isHaveOverModal = pathname.includes("company-create");

    return (
        <Modal
            {...modalProps}
            confirmLoading={loading}
            width={560}
            style={{ display: isHaveOverModal ? "none" : "inherit" }}
            onCancel={() => {
                if (onCancel) {
                    onCancel();
                    return;
                }
                //TODO: modalProps.onCancel expect an event so, I used close. Actually both of them are same.
                close();
                list("quotes", "replace");
            }}
        >
            <Spin spinning={loading}>
                <Form
                    {...formProps}
                    onFinish={(values) => {
                        handleOnFinish(values as QuoteMutationVariables);
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
                        extra={
                            <Button
                                style={{ paddingLeft: 0 }}
                                type="link"
                                icon={<PlusCircleOutlined />}
                                onClick={() =>
                                    replace(`company-create?to=${pathname}`)
                                }
                            >
                                Add new company
                            </Button>
                        }
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
