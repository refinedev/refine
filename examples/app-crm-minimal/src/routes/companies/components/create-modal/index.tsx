import { useModalForm, useSelect } from "@refinedev/antd";
import { HttpError, useGetToPath, useGo } from "@refinedev/core";
import { Form, Input, Modal, Select } from "antd";

import { SelectOptionWithAvatar } from "@/components";
import { Company, User } from "@/interfaces";

type FormValues = {
    name: string;
    salesOwnerId: string;
    contacts?: {
        name?: string;
        email?: string;
    }[];
};

export const CompanyCreateModal = () => {
    const getToPath = useGetToPath();
    const go = useGo();

    const { formProps, modalProps, close } = useModalForm<
        Company,
        HttpError,
        FormValues
    >({
        action: "create",
        defaultVisible: true,
        resource: "companies",
        redirect: false,
        mutationMode: "pessimistic",
        meta: {
            fields: ["id", { salesOwner: ["id"] }],
        },
    });

    const { selectProps, queryResult } = useSelect<User>({
        resource: "users",
        meta: {
            fields: ["name", "id", "avatarUrl"],
        },
        optionLabel: "name",
    });

    const closeModal = () => {
        // modal is a opening from the url (/companies/create)
        // to close modal we need to navigate to the list page (/companies)
        close();
        go({
            to: getToPath({
                action: "list",
            }),
            options: {
                keepQuery: true,
            },
            type: "replace",
        });
    };

    return (
        <Modal
            {...modalProps}
            mask={true}
            onCancel={closeModal}
            title="Add new company"
            width={512}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Company name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Please enter company name" />
                </Form.Item>
                <Form.Item
                    label="Sales owner"
                    name="salesOwnerId"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Please sales owner user"
                        {...selectProps}
                        options={
                            queryResult.data?.data?.map((user) => ({
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
