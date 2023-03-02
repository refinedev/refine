import { useContext } from "react";
import { IResourceComponentsProps, HttpError } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    useForm,
    useSelect,
    Select,
    InputNumber,
} from "@pankod/refine-antd";

import { IOrder, IProduct } from "interfaces";
import { StoreContext } from "context/store";

export const CreateOrder: React.FC<IResourceComponentsProps> = () => {
    const [store] = useContext(StoreContext);
    const { formProps, saveButtonProps } = useForm<IOrder, HttpError, IOrder>();

    const { selectProps: productSelectProps } = useSelect<IProduct>({
        resource: "61cb01b17ef57",
        optionLabel: "title",
        optionValue: "id",
        filters: [{ field: "storeId", operator: "eq", value: store }],
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
                        storeId: store,
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
                <Form.Item label="Customer Address" name="customerAddress">
                    <Input size="large" />
                </Form.Item>
            </Form>
        </Create>
    );
};
