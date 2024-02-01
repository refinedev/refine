import { useParams } from "react-router-dom";

import { AutoSaveIndicator, useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    InputNumberProps,
    InputProps,
    Row,
    Skeleton,
    Spin,
} from "antd";

import { FullScreenLoading, Text } from "@/components";
import { Quote, QuoteUpdateInput } from "@/graphql/schema.types";
import {
    QuotesUpdateQuoteMutation,
    QuotesUpdateQuoteMutationVariables,
} from "@/graphql/types";
import { currencyNumber } from "@/utilities";

import { QUOTES_UPDATE_QUOTE_MUTATION } from "../queries";

const columns = [
    {
        title: "Title",
        dataIndex: "title",
        flex: "auto",
        span: {
            xs: 6,
            md: 8,
        },
        Input: (props: InputProps) => <Input {...props} />,
    },
    {
        title: "Unit Price",
        dataIndex: "unitPrice",
        flex: "auto",
        span: {
            xs: 6,
            md: 5,
        },
        Input: (props: InputNumberProps) => (
            <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                    currencyNumber(Number(value || 0)).replace("$", "")
                }
                addonBefore="$"
                {...props}
            />
        ),
    },

    {
        title: "Quantity",
        dataIndex: "quantity",
        flex: "auto",
        span: {
            xs: 2,
        },
        Input: (props: InputNumberProps) => (
            <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) => (value ?? 0).toString()}
                {...props}
            />
        ),
    },
    {
        title: "Discount",
        dataIndex: "discount",
        flex: "auto",
        span: {
            xs: 4,
        },
        Input: (props: InputNumberProps) => (
            <InputNumber
                style={{ width: "100%" }}
                addonAfter="%"
                min={0}
                formatter={(value) => (value ?? 0).toString()}
                {...props}
            />
        ),
    },
    {
        title: "Total Price",
        dataIndex: "totalPrice",
        flex: "auto",
        span: {
            xs: 4,
        },
        Input: (props: InputNumberProps) => (
            <InputNumber
                disabled
                value={props.value}
                formatter={(value) => currencyNumber(Number(value || 0))}
                style={{ width: "100%", color: "rgba(0, 0, 0, 0.85)" }}
                bordered={false}
                {...props}
            />
        ),
    },
];

export const ProductsServices = () => {
    const params = useParams<{ id: string }>();

    const { formProps, autoSaveProps, queryResult } = useForm<
        GetFields<QuotesUpdateQuoteMutation>,
        HttpError,
        GetVariables<QuotesUpdateQuoteMutationVariables>
    >({
        resource: "quotes",
        action: "edit",
        id: params.id,
        liveMode: "off",
        autoSave: {
            enabled: true,
            debounce: 300,
            onFinish: (values) => {
                const items = (values.items || []).filter(
                    (item) => !!item?.title,
                );
                items?.forEach((item) => {
                    if ("totalPrice" in item) {
                        delete (item as any).totalPrice;
                    }
                });
                return {
                    ...values,
                    items,
                };
            },
        },
        onMutationSuccess: () => {
            refetch?.();
        },
        meta: {
            gqlMutation: QUOTES_UPDATE_QUOTE_MUTATION,
        },
    });

    const {
        isLoading = false,
        isFetching = false,
        refetch,
    } = queryResult ?? {};

    const { total, subTotal, items } = queryResult?.data?.data ?? {};

    return (
        <div
            style={{
                padding: "0px 32px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    size="xl"
                    style={{
                        fontWeight: 500,
                    }}
                >
                    Products / Services
                </Text>
                <AutoSaveIndicator {...autoSaveProps} />
            </div>

            <div
                style={{
                    marginTop: "32px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <Row
                    gutter={[16, 16]}
                    style={{
                        padding: "12px 16px",
                        backgroundColor: "#fafafa",
                        borderBottom: "1px solid #F0F0F0",
                    }}
                >
                    {columns.map((column) => {
                        return (
                            <Col
                                key={column.title}
                                {...column.span}
                                flex={column.flex}
                                style={{
                                    borderRight: "1px solid #F0F0F0",
                                }}
                            >
                                <Text
                                    size="sm"
                                    style={{
                                        fontWeight: 500,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {column.title}
                                </Text>
                            </Col>
                        );
                    })}
                </Row>
                <Form {...formProps}>
                    {isLoading && <FullScreenLoading />}
                    {!isLoading && (
                        <Form.List name="items">
                            {(fields, { add, remove }) => {
                                return (
                                    <>
                                        {fields.map((field) => {
                                            return (
                                                <div
                                                    key={field.key}
                                                    style={{
                                                        padding: "8px 16px",
                                                        borderBottom:
                                                            "1px solid #d9d9d9",
                                                    }}
                                                >
                                                    <Row gutter={[16, 16]}>
                                                        {columns.map(
                                                            ({
                                                                Input,
                                                                ...column
                                                            }) => {
                                                                return (
                                                                    <Col
                                                                        key={
                                                                            column.title
                                                                        }
                                                                        {...column.span}
                                                                        flex={
                                                                            column.flex
                                                                        }
                                                                    >
                                                                        {column.dataIndex ===
                                                                        "totalPrice" ? (
                                                                            <Input
                                                                                value={
                                                                                    items?.[
                                                                                        field
                                                                                            .key
                                                                                    ]
                                                                                        ?.totalPrice ||
                                                                                    0
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <Form.Item
                                                                                {...field}
                                                                                noStyle
                                                                                name={[
                                                                                    field.name,
                                                                                    column.dataIndex,
                                                                                ]}
                                                                            >
                                                                                <Input />
                                                                            </Form.Item>
                                                                        )}
                                                                    </Col>
                                                                );
                                                            },
                                                        )}
                                                        <Col span={1}>
                                                            <Button
                                                                size="small"
                                                                style={{
                                                                    marginTop:
                                                                        "4px",
                                                                }}
                                                                danger
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                onClick={() =>
                                                                    remove(
                                                                        field.name,
                                                                    )
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            );
                                        })}
                                        <Button
                                            type="link"
                                            icon={<PlusCircleOutlined />}
                                            onClick={() =>
                                                add({
                                                    title: "",
                                                    unitPrice: 0,
                                                    quantity: 0,
                                                    discount: 0,
                                                })
                                            }
                                            style={{
                                                marginTop: "8px",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Add new item
                                        </Button>
                                    </>
                                );
                            }}
                        </Form.List>
                    )}
                </Form>
            </div>

            <TotalSection
                total={total || 0}
                subTotal={subTotal || 0}
                isLoading={isLoading}
                isFetching={isFetching}
                taxFormOnMutationSuccess={() => refetch?.()}
            />
        </div>
    );
};

const TotalSection = (props: {
    total: number;
    subTotal: number;
    isLoading: boolean;
    isFetching: boolean;
    taxFormOnMutationSuccess: () => void;
}) => {
    const { total, subTotal, isLoading, isFetching, taxFormOnMutationSuccess } =
        props;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "max-content",
                gap: "16px",
                marginTop: "16px",
                marginLeft: "auto",
            }}
        >
            {isLoading && (
                <>
                    <Skeleton.Input
                        size="small"
                        style={{ width: "96px", height: "22px" }}
                        block
                    />
                    <Skeleton.Input
                        size="small"
                        style={{ width: "96px", height: "22px" }}
                        block
                    />
                    <Skeleton.Input
                        size="small"
                        style={{ width: "96px", height: "22px" }}
                        block
                    />
                </>
            )}
            {!isLoading && (
                <>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            <Text size="sm">Subtotal</Text>
                        </div>
                        <div>
                            <Text size="sm">
                                {currencyNumber(subTotal || 0)}
                            </Text>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                        }}
                    >
                        <div>
                            <Text size="sm">Sales tax</Text>
                        </div>
                        <div
                            style={{
                                width: "96px",
                                justifyContent: "space-between",
                            }}
                        >
                            <TaxForm
                                loading={isFetching}
                                onMutationSuccess={() =>
                                    taxFormOnMutationSuccess()
                                }
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            <Text size="sm">Total value</Text>
                        </div>
                        <div>
                            <Text size="sm">{currencyNumber(total || 0)}</Text>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const TaxForm = (props: {
    loading?: boolean;
    onMutationSuccess?: () => void;
}) => {
    const params = useParams<{ id: string }>();

    const { formProps, queryResult } = useForm<
        Quote,
        HttpError,
        QuoteUpdateInput
    >({
        resource: "quotes",
        action: "edit",
        id: params.id,
        redirect: false,
        liveMode: "off",
        warnWhenUnsavedChanges: false,
        autoSave: {
            enabled: true,
        },
        meta: {
            gqlMutation: QUOTES_UPDATE_QUOTE_MUTATION,
        },
        onMutationSuccess: () => {
            props.onMutationSuccess?.();
        },
    });

    const formLoading = queryResult?.isLoading ?? false;

    if (formLoading) {
        return (
            <Skeleton.Input
                size="small"
                style={{ width: "96px", height: "22px" }}
                block
            />
        );
    }

    return (
        <Form {...formProps}>
            <Form.Item noStyle name="tax">
                <InputNumber
                    size="small"
                    disabled={props.loading}
                    addonAfter={props.loading ? <Spin size="small" /> : "%"}
                    min={0}
                    formatter={(value) => (value ?? 0).toString()}
                />
            </Form.Item>
        </Form>
    );
};
