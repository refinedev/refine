import { useContext } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
    InputNumber,
} from "@pankod/refine-antd";

import { IOrder, IProduct } from "interfaces";
import { StoreContext } from "context/store";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IOrder>();
    const [store] = useContext(StoreContext);

    const postData = queryResult?.data?.data;
    const { selectProps: productSelectProps } = useSelect<IProduct>({
        resource: "61cb01b17ef57",
        defaultValue: postData?.productId,
        optionLabel: "title",
        optionValue: "id",
        filters: [{ field: "storeId", operator: "eq", value: store }],
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

                <Form.Item label="Quantitiy" name="quantitity">
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
