import { useMany, CrudFilters, HttpError } from "@pankod/refine-core";

import {
    List,
    Typography,
    AntdList,
    useSimpleList,
    NumberField,
    Space,
    Select,
    useSelect,
    Form,
    DatePicker,
} from "@pankod/refine-antd";

const { RangePicker } = DatePicker;
const { Text } = Typography;

import { IPost, ICategory, IPostFilterVariables } from "interfaces";

export const PostList: React.FC = () => {
    const { listProps, searchFormProps } = useSimpleList<
        IPost,
        HttpError,
        IPostFilterVariables
    >({
        pagination: {
            pageSize: 3,
        },
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { category, createdAt } = params;

            filters.push(
                {
                    field: "category.id",
                    operator: "eq",
                    value: category,
                },
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt ? createdAt[0].toISOString() : undefined,
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt ? createdAt[1].toISOString() : undefined,
                },
            );

            return filters;
        },
    });

    const categoryIds =
        listProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const renderItem = (item: IPost) => {
        const { title, hit, content } = item;

        const categoryTitle = data?.data.find(
            (category: ICategory) => category.id === item.category.id,
        )?.title;

        return (
            <AntdList.Item
                actions={[
                    <Space key={item.id} direction="vertical" align="end">
                        <NumberField
                            value={hit}
                            options={{
                                notation: "compact",
                            }}
                        />
                        <Text>{categoryTitle}</Text>
                    </Space>,
                ]}
            >
                <AntdList.Item.Meta title={title} description={content} />
            </AntdList.Item>
        );
    };

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Form
                {...searchFormProps}
                layout="vertical"
                onValuesChange={() => searchFormProps.form?.submit()}
            >
                <Space wrap>
                    <Form.Item label="Category" name="category">
                        <Select
                            {...categorySelectProps}
                            style={{ minWidth: "250px" }}
                            allowClear
                            placeholder="Search Categories"
                        />
                    </Form.Item>
                    <Form.Item label="Created At" name="createdAt">
                        <RangePicker />
                    </Form.Item>
                </Space>
            </Form>
            <AntdList {...listProps} renderItem={renderItem} />
        </List>
    );
};
