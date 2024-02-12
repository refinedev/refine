import {
    HttpError,
    useGo,
    useList,
    useNavigation,
    useTranslate,
} from "@refinedev/core";
import { NumberField, useSimpleList } from "@refinedev/antd";
import {
    ICategory,
    IProduct,
    IProductFilterVariables,
} from "../../../interfaces";
import {
    Card,
    Divider,
    Flex,
    List,
    Skeleton,
    Tag,
    Typography,
    theme,
} from "antd";
import { ProductStatus } from "../status";
import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined, TagOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useStyles } from "./styled";
import { useLocation } from "react-router-dom";

export const ProductListCard = () => {
    const { styles, cx } = useStyles();
    const { token } = theme.useToken();
    const t = useTranslate();
    const go = useGo();
    const { pathname } = useLocation();
    const { editUrl } = useNavigation();

    const {
        listProps: productListProps,
        filters,
        setFilters,
    } = useSimpleList<IProduct, HttpError, IProductFilterVariables>({
        pagination: {
            current: 1,
            pageSize: 12,
        },
        filters: {
            initial: [
                {
                    field: "category.id",
                    operator: "in",
                    value: [],
                },
            ],
        },
    });

    const { data: categoryData, isLoading: categoryIsLoading } = useList<
        ICategory,
        HttpError
    >({
        resource: "categories",
        pagination: {
            current: 1,
            pageSize: 999,
        },
    });

    const categoryFilters = useMemo(() => {
        const filter = filters.find((filter) => {
            if ("field" in filter) {
                return filter.field === "category.id";
            }

            return false;
        });

        const filterValues = filter?.value?.map((value: string | number) =>
            Number(value),
        );

        return {
            operator: filter?.operator || "in",
            value: filterValues,
        };
    }, [filters]);

    return (
        <>
            <Divider style={{ margin: "16px 0px" }} />
            <Flex
                wrap="nowrap"
                gap={12}
                style={{
                    width: "100%",
                    overflowX: "auto",
                }}
            >
                <Tag
                    style={{ padding: "4px 10px 4px 10px", cursor: "pointer" }}
                    color={
                        !categoryFilters?.value?.length
                            ? token.colorPrimary
                            : undefined
                    }
                    icon={<TagOutlined />}
                    onClick={() => {
                        setFilters([
                            {
                                field: "category.id",
                                operator: "in",
                                value: [],
                            },
                        ]);
                    }}
                >
                    {t("products.filter.allCategories.label")}
                </Tag>
                {!categoryIsLoading &&
                    categoryData?.data?.map((category) => (
                        <Tag
                            key={category.id}
                            color={
                                categoryFilters?.value?.includes(category.id)
                                    ? "orange"
                                    : undefined
                            }
                            style={{
                                padding: "4px 10px 4px 10px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setFilters([
                                    {
                                        field: "category.id",
                                        operator: "in",
                                        value: [
                                            ...(categoryFilters?.value || []),
                                            category.id,
                                        ],
                                    },
                                ]);
                            }}
                        >
                            {category.title}
                        </Tag>
                    ))}

                {categoryIsLoading &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            style={{
                                width: "108px",
                                height: "30px",
                            }}
                            active
                        />
                    ))}
            </Flex>
            <Divider style={{ margin: "16px 0px" }} />
            <List
                {...productListProps}
                pagination={{
                    ...productListProps.pagination,
                    showTotal: (total) => (
                        <PaginationTotal
                            total={total}
                            entityName={"products"}
                        />
                    ),
                }}
                grid={{
                    gutter: [16, 16],
                    column: 4,
                    xxl: 4,
                    xl: 4,
                    lg: 3,
                    md: 2,
                    sm: 1,
                    xs: 1,
                }}
                renderItem={(item) => (
                    <List.Item style={{ height: "100%" }}>
                        <Card
                            hoverable
                            bordered={false}
                            className={styles.card}
                            styles={{
                                body: {
                                    padding: 16,
                                },
                                cover: {
                                    position: "relative",
                                },
                                actions: {
                                    marginTop: "auto",
                                },
                            }}
                            cover={
                                <>
                                    <Tag
                                        onClick={() => {
                                            return go({
                                                to: `${editUrl(
                                                    "products",
                                                    item.id,
                                                )}`,
                                                query: {
                                                    to: pathname,
                                                },
                                                options: {
                                                    keepQuery: true,
                                                },
                                                type: "replace",
                                            });
                                        }}
                                        className={cx(
                                            styles.viewButton,
                                            "viewButton",
                                        )}
                                        icon={<EyeOutlined />}
                                    >
                                        View
                                    </Tag>
                                    <img
                                        src={item.images[0].url}
                                        alt={item.images[0].name}
                                        style={{
                                            aspectRatio: 288 / 160,
                                            objectFit: "cover",
                                        }}
                                    />
                                </>
                            }
                            actions={[
                                <Flex
                                    key="actions"
                                    justify="space-between"
                                    style={{
                                        padding: "0 16px",
                                    }}
                                >
                                    <Typography.Text key="category.title">
                                        {item.category.title}
                                    </Typography.Text>
                                    <ProductStatus
                                        key="status"
                                        value={item.isActive}
                                    />
                                </Flex>,
                            ]}
                        >
                            <Card.Meta
                                title={
                                    <Flex>
                                        <Typography.Title
                                            level={5}
                                            ellipsis={{
                                                rows: 1,
                                                tooltip: item.name,
                                            }}
                                        >
                                            {item.name}
                                        </Typography.Title>

                                        <NumberField
                                            value={item.price}
                                            style={{
                                                paddingLeft: "8px",
                                                marginLeft: "auto",
                                            }}
                                            options={{
                                                style: "currency",
                                                currency: "USD",
                                            }}
                                        />
                                    </Flex>
                                }
                                description={item.description}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </>
    );
};
