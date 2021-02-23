import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button } from "antd";
import pluralize from "pluralize";

import { useOne } from "@hooks";
import { BaseRecord } from "@interfaces";

export interface ShowProps {
    resourceName: string;
}

export const Show: React.FC<ShowProps> = ({ resourceName, children }) => {
    const { id } = useParams<Record<string, string>>();

    const { data, isLoading } = useOne(resourceName, id);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName,
                record: data?.data,
            });
        }
        return child;
    });

    return (
        <Card
            title={`Show ${pluralize.singular(resourceName)}`}
            // extra={
            //     <Button
            //         htmlType="submit"
            //         disabled={isLoading}
            //         type="primary"
            //         // icon={<SaveOutlined />}
            //         // onClick={(): void => form.submit()}
            //     >
            //         Save
            //     </Button>
            // }
        >
            {childrenWithProps}
        </Card>
    );
};
