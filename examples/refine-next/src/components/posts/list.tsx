import {
    IResourceComponentsProps,
    GetListResponse,
    useMany,
    useTranslate,
} from "@pankod/refine-core";
import {
    List,
    Table,
    TextField,
    useTable,
    getDefaultSortOrder,
    DateField,
    Space,
    EditButton,
    DeleteButton,
    useSelect,
    TagField,
    FilterDropdown,
    Select,
    ShowButton,
    Button,
    SaveButton,
    useEditableTable,
} from "@pankod/refine-antd";
import { IPost, ICategory } from "src/interfaces";

export const PostList: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
> = ({ initialData }) => {
    const t = useTranslate();

    const {
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
        tableProps,
        sorter,
    } = useEditableTable<IPost>({});

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    key="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title={t("posts.fields.title")}
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="status"
                    key="status"
                    title={t("posts.fields.status.title")}
                    render={(value) => <TagField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("status", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="createdAt"
                    key="createdAt"
                    title={t("posts.fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title={t("posts.fields.category.title")}
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value={t("loading")} />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder={t(
                                    "posts.fields.category.filter.placeholder",
                                )}
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Inline Actions"
                    dataIndex="inlineActions"
                    key="inlineActions"
                    render={(_text, record) => {
                        if (isEditing(record.id!)) {
                            return (
                                <Space>
                                    <SaveButton
                                        {...saveButtonProps}
                                        size="small"
                                    />
                                    <Button {...cancelButtonProps} size="small">
                                        Cancel
                                    </Button>
                                </Space>
                            );
                        }
                        return (
                            <Space>
                                <EditButton
                                    {...editButtonProps(record.id!)}
                                    size="small"
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};
