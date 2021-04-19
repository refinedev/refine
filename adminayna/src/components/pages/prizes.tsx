import * as React from "react";

import {
    List,
    Create,
    Edit,
    Show,
    Form,
    TextField,
    NumberField,
    BooleanField,
    FilterDropdown,
    Radio,
    Input,
    Upload,
    normalizeFile,
    useApiUrl,
    Table,
    useTable,
    Space,
    EditButton,
    DeleteButton,
    ShowButton,
    CreateButton,
    ExportButton,
    DateField,
    ImageField,
    useForm,
    InputNumber,
    Switch,
    IResourceComponentsProps,
    Typography,
    useShow,
    useFileUploadState,
} from "readmin";

const { Title, Text } = Typography;

export const PrizesList = (props: IResourceComponentsProps) => {
    const { tableProps, sorter, filters } = useTable({});

    const Actions = () => (
        <Space direction="horizontal">
            <ExportButton
                sorter={sorter}
                filters={filters}
                pageSize={100}
                maxItemCount={300}
                mapData={(item) => {
                    return {
                        id: item.id,
                        text: item.text,
                        description: item.description,
                        weight: item.weight,
                        externalId: item.externalId,
                        isActive: item.isActive,
                        image: item.images[0].url,
                    };
                }}
            />

            <CreateButton />
        </Space>
    );

    return (
        <List {...props} actionButtons={<Actions />}>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Table.Column
                    dataIndex="images"
                    title="Images"
                    key="images"
                    render={(value) => (
                        <ImageField width={100} value={value?.[0].url} />
                    )}
                />
                <Table.Column
                    dataIndex="text"
                    title="Text"
                    key="text"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="weight"
                    title="Weight"
                    key="weight"
                    render={(value) => <NumberField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="isActive"
                    title="Active"
                    key="isActive"
                    render={(value) => <BooleanField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value={true}>Active</Radio>
                                <Radio value={false}>Passive</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="Created At"
                    key="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="updatedAt"
                    title="Updated At"
                    key="updatedAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    title={"Actions"}
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string | number;
                        },
                    ): React.ReactNode => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <DeleteButton
                                size="small"
                                recordItemId={record.id}
                                mutationMode="undoable"
                            />
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const PrizesCreate = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm({});
    const apiUrl = useApiUrl();
    const { onChange, isLoading } = useFileUploadState();

    return (
        <Create
            {...props}
            saveButtonProps={{
                ...saveButtonProps,
                loading: saveButtonProps?.loading || isLoading,
            }}
        >
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Text"
                    name="text"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="IsActive"
                    name="isActive"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Switch />
                </Form.Item>
                <Form.Item label="ExternalId" name="externalId">
                    <Input />
                </Form.Item>
                <Form.Item label={"Image"}>
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={1}
                            onChange={onChange}
                            multiple
                        >
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single upload
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};

export const PrizeEdit = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm({});
    const apiUrl = useApiUrl();
    const { onChange, isLoading } = useFileUploadState();

    return (
        <Edit
            {...props}
            saveButtonProps={{
                ...saveButtonProps,
                loading: saveButtonProps?.loading || isLoading,
            }}
        >
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Text"
                    name="text"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="IsActive"
                    name="isActive"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Switch />
                </Form.Item>
                <Form.Item label="ExternalId" name="externalId">
                    <Input />
                </Form.Item>
                <Form.Item label={"Image"}>
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={1}
                            multiple
                            onChange={onChange}
                        >
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single upload
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const PrizeShow = (props: IResourceComponentsProps) => {
    const {
        queryResult: { data, isLoading },
    } = useShow({});
    const record = data?.data;

    return (
        <Show {...props} isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Text</Title>
            <Text>{record?.text}</Text>

            <Title level={5}>Weight</Title>
            <Text>{record?.weight}</Text>

            <Title level={5}>Active</Title>
            <BooleanField value={record?.isActive} />

            <Title level={5}>Image</Title>
            <ImageField width={150} value={record?.images?.[0].url} />
        </Show>
    );
};
