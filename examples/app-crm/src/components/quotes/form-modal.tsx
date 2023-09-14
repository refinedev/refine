import { useModalForm, useSelect } from "@refinedev/antd";
import { RedirectAction, useGetToPath } from "@refinedev/core";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { FC, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { Quote } from "../../interfaces/graphql";
import { PlusCircleOutlined } from "@ant-design/icons";

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
    const { pathname } = useLocation();
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();

    const { formProps, modalProps, close, onFinish } = useModalForm<Quote>({
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
                        extra={
                            <Button
                                style={{ paddingLeft: 0 }}
                                type="link"
                                icon={<PlusCircleOutlined />}
                                onClick={() =>
                                    navigate(`company-create?to=${pathname}`, {
                                        replace: true,
                                    })
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
