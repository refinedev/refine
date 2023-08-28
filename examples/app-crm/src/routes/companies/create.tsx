import {
    CreateResponse,
    HttpError,
    useCreateMany,
    useGetIdentity,
    useGetToPath,
} from "@refinedev/core";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import {
    UserOutlined,
    MailOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    LeftOutlined,
} from "@ant-design/icons";

import { SelectOptionWithAvatar } from "../../components/select-option-with-avatar";
import { Company, User } from "../../interfaces/graphql";

type Props = {
    isOverModal?: boolean;
};

type FormValues = {
    name: string;
    salesOwnerId: string;
    contacts?: {
        name?: string;
        email?: string;
    }[];
};

export const CompanyCreatePage = ({ isOverModal }: Props) => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { data: user } = useGetIdentity<User>();
    const { pathname } = useLocation();

    const { formProps, modalProps, close, onFinish } = useModalForm<
        Company,
        HttpError,
        FormValues
    >({
        action: "create",
        defaultVisible: true,
        resource: "companies",
        redirect: false,
        warnWhenUnsavedChanges: !isOverModal,
        mutationMode: "pessimistic",
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
            mask={!isOverModal}
            onCancel={() => {
                close();
                const path =
                    searchParams.get("to") ??
                    getToPath({
                        action: "list",
                    }) ??
                    "";

                navigate(path, {
                    replace: true,
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
                        const companyId = (data as CreateResponse<Company>)
                            ?.data.id;

                        if (values.contacts?.length === 0) {
                            return;
                        }

                        await createManyMutateAsync({
                            resource: "contacts",
                            values:
                                values.contacts?.map((contact) => ({
                                    ...contact,
                                    companyId,
                                    salesOwnerId: user?.id,
                                })) ?? [],
                            successNotification: false,
                        });

                        close();
                        // navigate to path
                        const to = searchParams.get("to") ?? pathname;
                        const path = `${to}?companyId=${companyId}`;
                        navigate(path, {
                            replace: true,
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
