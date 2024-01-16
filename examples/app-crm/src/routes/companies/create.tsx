import { useLocation, useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import {
    CreateResponse,
    HttpError,
    useCreateMany,
    useGetToPath,
    useGo,
} from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import {
    DeleteOutlined,
    LeftOutlined,
    MailOutlined,
    PlusCircleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Typography,
} from "antd";

import { SelectOptionWithAvatar } from "@/components";
import { Company } from "@/graphql/schema.types";
import {
    CreateCompanyMutation,
    CreateCompanyMutationVariables,
} from "@/graphql/types";
import { useUsersSelect } from "@/hooks/useUsersSelect";

import { COMPANY_CREATE_MUTATION } from "./queries";

type Props = {
    isOverModal?: boolean;
};

type FormValues = GetVariables<CreateCompanyMutationVariables> & {
    contacts?: {
        name?: string;
        email?: string;
    }[];
};

export const CompanyCreatePage = ({ isOverModal }: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();

    const { formProps, modalProps, close, onFinish } = useModalForm<
        GetFields<CreateCompanyMutation>,
        HttpError,
        FormValues
    >({
        action: "create",
        defaultVisible: true,
        resource: "companies",
        redirect: false,
        warnWhenUnsavedChanges: !isOverModal,
        mutationMode: "pessimistic",
        meta: {
            gqlMutation: COMPANY_CREATE_MUTATION,
        },
    });

    const { selectProps, queryResult } = useUsersSelect();

    const { mutateAsync: createManyMutateAsync } = useCreateMany();

    return (
        <Modal
            {...modalProps}
            mask={!isOverModal}
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
                <Form.List name="contacts">
                    {(fields, { add, remove }) => (
                        <Space direction="vertical">
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={12} align="middle">
                                    <Col span={11}>
                                        <Form.Item
                                            noStyle
                                            {...restField}
                                            name={[name, "name"]}
                                        >
                                            <Input
                                                addonBefore={<UserOutlined />}
                                                placeholder="Contact name"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            noStyle
                                            name={[name, "email"]}
                                        >
                                            <Input
                                                addonBefore={<MailOutlined />}
                                                placeholder="Contact email"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Button
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(name)}
                                        />
                                    </Col>
                                </Row>
                            ))}
                            <Typography.Link onClick={() => add()}>
                                <PlusCircleOutlined /> Add new contacts
                            </Typography.Link>
                        </Space>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};
