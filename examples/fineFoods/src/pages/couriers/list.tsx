import {
    List,
    Table,
    Avatar,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    DateField,
    BooleanField,
    EditButton,
    useDrawerForm,
    Drawer,
    Form,
    Create,
    Edit,
    Input,
    getValueFromEvent,
    Checkbox,
    Select,
    Upload,
    useApiUrl,
} from "@pankod/refine";

import { ICourier } from "interfaces";

export const CourierList: React.FC<IResourceComponentsProps> = () => {
    const apiUrl = useApiUrl();
    const t = useTranslate();

    const { tableProps } = useTable<ICourier>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const { formProps, drawerProps, show, saveButtonProps } =
        useDrawerForm<ICourier>({
            action: "create",
        });

    const {
        formProps: editFormProps,
        drawerProps: editDrawerProps,
        show: editDrawerShow,
        saveButtonProps: editSaveButtonProps,
        deleteButtonProps,
        editId,
    } = useDrawerForm<ICourier>({
        action: "edit",
    });

    return (
        <List
            createButtonProps={{
                onClick: () => {
                    show();
                },
            }}
            title={t("couriers:title")}
        >
            <Drawer {...editDrawerProps} width={600}>
                <Edit
                    saveButtonProps={editSaveButtonProps}
                    deleteButtonProps={deleteButtonProps}
                    recordItemId={editId}
                >
                    <Form {...editFormProps} layout="vertical">
                        <Form.Item
                            label={t("couriers:fields.name")}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.surname")}
                            name="surname"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.gsm")}
                            name="gsm"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.gender")}
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Male",
                                        value: "Male",
                                    },
                                    {
                                        label: "Female",
                                        value: "Female",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.isActive")}
                            name="isActive"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            valuePropName="checked"
                        >
                            <Checkbox value={true}>
                                {t("couriers:fields.isActive")}
                            </Checkbox>
                        </Form.Item>
                        <Form.Item label={t("couriers:fields.avatar.label")}>
                            <Form.Item
                                name="avatar"
                                valuePropName="fileList"
                                getValueFromEvent={getValueFromEvent}
                                noStyle
                            >
                                <Upload.Dragger
                                    name="file"
                                    action={`${apiUrl}/media/upload`}
                                    listType="picture"
                                    maxCount={5}
                                    multiple
                                >
                                    <p className="ant-upload-text">
                                        {t(
                                            "couriers:fields:avatar.description",
                                        )}
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Edit>
            </Drawer>

            <Drawer {...drawerProps} width={600}>
                <Create saveButtonProps={saveButtonProps}>
                    <Form
                        {...formProps}
                        layout="vertical"
                        initialValues={{
                            isActive: true,
                        }}
                    >
                        <Form.Item
                            label={t("couriers:fields.name")}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.surname")}
                            name="surname"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.gsm")}
                            name="gsm"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.gender")}
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Male",
                                        value: "Male",
                                    },
                                    {
                                        label: "Female",
                                        value: "Female",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.isActive")}
                            name="isActive"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            valuePropName="checked"
                        >
                            <Checkbox value={true}>
                                {t("couriers:fields.isActive")}
                            </Checkbox>
                        </Form.Item>
                        <Form.Item label={t("couriers:fields.avatar.label")}>
                            <Form.Item
                                name="avatar"
                                valuePropName="fileList"
                                getValueFromEvent={getValueFromEvent}
                                noStyle
                            >
                                <Upload.Dragger
                                    name="file"
                                    action={`${apiUrl}/media/upload`}
                                    listType="picture"
                                    maxCount={5}
                                    multiple
                                >
                                    <p className="ant-upload-text">
                                        {t(
                                            "couriers:fields:avatar.description",
                                        )}
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Create>
            </Drawer>

            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title={t("couriers:fields.id")}
                />
                <Table.Column
                    align="center"
                    key="avatar"
                    dataIndex={["avatar"]}
                    title={t("couriers:fields.avatar.label")}
                    render={(value) => <Avatar src={value[0].url} />}
                />
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title={t("couriers:fields.name")}
                />
                <Table.Column
                    key="surname"
                    dataIndex="surname"
                    title={t("couriers:fields.surname")}
                />
                <Table.Column
                    key="gender"
                    dataIndex="gender"
                    title={t("couriers:fields.gender")}
                />
                <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title={t("products:fields.isActive")}
                    render={(value) => <BooleanField value={value} />}
                />
                <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("couriers:fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<ICourier>
                    title={t("common:table.actions")}
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
                        <EditButton
                            size="small"
                            recordItemId={record.id}
                            onClick={() => editDrawerShow(record.id)}
                        />
                    )}
                />
            </Table>
        </List>
    );
};
