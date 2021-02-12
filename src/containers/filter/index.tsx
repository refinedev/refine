import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import { Form } from "antd";

export interface FilterProps {
    resourceName: string;
}

export const Filter: React.FC<FilterProps> = ({ resourceName, children }) => {
    const history = useHistory();
    const { search } = useLocation();
    const [form] = Form.useForm();

    const preQueries = qs.parse(search);

    form.setFieldsValue(preQueries);

    const onValuesChange = (_changedValues: object, values: object): void => {
        const newQueries = {
            ...preQueries,
            ...values,
            current: 1,
        };

        return history.push(
            `/resources/${resourceName}?${qs.stringify(newQueries)}`,
        );
    };

    return (
        <Form
            name="filter-form"
            form={form}
            style={{
                marginBlock: 10,
            }}
            layout="inline"
            onValuesChange={onValuesChange}
        >
            {children}
        </Form>
    );
};
