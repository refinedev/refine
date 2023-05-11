import {
    IResourceComponentsProps,
    HttpError,
    useParsed,
} from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";

import { IOrder, IProduct } from "interfaces";

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant?: string }>();
    const { formProps, saveButtonProps } = useForm<IOrder, HttpError, IOrder>();

    const { selectProps: productSelectProps } = useSelect<IProduct>({
        resource: "products",
        optionLabel: "title",
        optionValue: "id",
        filters: [{ field: "storeId", operator: "eq", value: params?.tenant }],
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
                onFinish={(values) => {
                    return formProps.onFinish?.({
                        ...values,
                        storeId: params?.tenant,
                    });
                }}
            >
                <Form.Item
                    label="Product"
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
                <Form.Item label="Customer Address" name="customerAddress">
                    <Input size="large" />
                </Form.Item>
            </Form>
        </Create>
    );
};
