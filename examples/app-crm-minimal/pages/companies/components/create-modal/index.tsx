import { useModalForm, useSelect } from "@refinedev/antd";
import {
    CreateResponse,
    HttpError,
    useCreateMany,
    useGetToPath,
    useGo,
} from "@refinedev/core";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { LeftOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select } from "antd";

import { SelectOptionWithAvatar } from "@components";
import { Company, User } from "@interfaces";

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
    const searchParams = useSearchParams();
    const { pathname } = useRouter();
    const go = useGo();

    const { formProps, modalProps, close, onFinish } = useModalForm<
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

    const { mutateAsync: createManyMutateAsync } = useCreateMany();

    return (
        <Modal
            {...modalProps}
            mask={true}
            onCancel={() => {
                close();
                go({
                    to:
                        searchParams.get("to") ??
                        getToPath({
                            action: "list",
                        }) ??
                        "",
                    query: {
                        to: undefined,
                    },
                    options: {
                        keepQuery: true,
                    },
                    type: "replace",
                });
            }}
            title="Add new company"
            width={512}
            closeIcon={<LeftOutlined />}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={async (values) => {
                    try {
                        const data = await onFinish({
                            name: values.name,
                            salesOwnerId: values.salesOwnerId,
                        });

                        const createdCompany = (data as CreateResponse<Company>)
                            ?.data;

                        if ((values.contacts ?? [])?.length > 0) {
                            await createManyMutateAsync({
                                resource: "contacts",
                                values:
                                    values.contacts?.map((contact) => ({
                                        ...contact,
                                        companyId: createdCompany.id,
                                        salesOwnerId:
                                            createdCompany.salesOwner.id,
                                    })) ?? [],
                                successNotification: false,
                            });
                        }

                        go({
                            to: searchParams.get("to") ?? pathname,
                            query: {
                                companyId: createdCompany.id,
                                to: undefined,
                            },
                            options: {
                                keepQuery: true,
                            },
                            type: "replace",
                        });
                    } catch (error) {
                        Promise.reject(error);
                    }
                }}
            >
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
