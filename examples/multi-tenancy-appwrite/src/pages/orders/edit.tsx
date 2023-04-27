import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";

import { IOrder, IProduct } from "interfaces";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant?: string }>();
    const { formProps, saveButtonProps, queryResult } = useForm<IOrder>();

    const postData = queryResult?.data?.data;
    const { selectProps: productSelectProps } = useSelect<IProduct>({
        resource: "products",
        defaultValue: postData?.productId,
        optionLabel: "title",
        optionValue: "id",
        filters: [{ field: "storeId", operator: "eq", value: params?.tenant }],
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Product Title"
                    name="productId"
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
                <Form.Item label="Customer Adress" name="customerAddress">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
