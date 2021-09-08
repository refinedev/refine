import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useMany,
    FilterDropdown,
    Typography,
    Checkbox,
    useCheckboxGroup,
    useSelect,
    Select,
    Radio,
    TagField,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";
const { Title } = Typography;

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, filters } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const { checkboxGroupProps } = useCheckboxGroup<IPost>({
        resource: "categories",
    });
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
    });

    return (
        <List
            pageHeaderProps={{
                onBack: () => console.log("clicked"),
                subTitle: "Subtitle",
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Title level={5}>Rol Seçin</Title>
                            <Checkbox.Group
                                style={{ width: 200 }}
                                {...checkboxGroupProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value: string) => <TagField value={value} />}
                    filterDropdown={(props: any) => (
                        <FilterDropdown
                            {...props}
                            mapValue={(selectedKeys) => {
                                return selectedKeys[0];
                            }}
                        >
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
