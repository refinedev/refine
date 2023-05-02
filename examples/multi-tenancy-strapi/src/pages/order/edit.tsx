import {
    IResourceComponentsProps,
    HttpError,
    useParsed,
} from "@refinedev/core";
import { useForm, useSelect, Edit } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";

import { IOrder, IProduct } from "interfaces";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant: string }>();
    const { formProps, saveButtonProps, queryResult } = useForm<
        IOrder,
        HttpError,
        IOrder
    >({
        metaData: { populate: "product" },
    });

    const productData = queryResult?.data?.data;

    const { selectProps: productSelectProps } = useSelect<IProduct>({
        resource: "products",
        defaultValue: productData?.product?.id,
        optionLabel: "title",
        optionValue: "id",
        filters: [
            {
                field: "stores][id]",
                operator: "eq",
                value: params?.tenant,
            },
        ],
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                    ...formProps.initialValues,
                }}
            >
                <Form.Item
                    label="Product"
                    name={["product", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...productSelectProps} />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity">
                    <InputNumber defaultValue={1} />
                </Form.Item>

                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Not Delivered",
                                value: "not delivered",
                            },
                            {
                                label: "Delivered",
                                value: "delivered",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Customer Name" name="customerName">
                    <Input />
                </Form.Item>
                <Form.Item label="Customer Address" name="customerAddress">
                    <Input size="large" />
                </Form.Item>
            </Form>
        </Edit>
    );
};
