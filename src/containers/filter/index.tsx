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

    return (
        <Form
            style={{ marginBlock: 10 }}
            layout="inline"
            onValuesChange={(_changedValues, values): void => {
                const preQueries = qs.parse(search);

                const newQueries = { ...preQueries, ...values, current: 1 };

                return history.push(
                    `/resources/${resourceName}?${qs.stringify(newQueries)}`,
                );
            }}
        >
            {children}
        </Form>
    );
};
