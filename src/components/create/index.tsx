import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Card } from "antd";
import pluralize from "pluralize";

import { DataContext } from "@contexts/data";
import { IDataContext } from "@interfaces";

export interface CreateProps {
    resourceName?: string;
    canEdit?: any;
}

export const Create: React.FC<CreateProps> = ({
    resourceName,
    canEdit,
    children,
}) => {
    const { create } = useContext<IDataContext>(DataContext);
    const history = useHistory();

    if (!resourceName) {
        // TODO: render resource error page
        return <span>params error</span>;
    }

    const mutation = useMutation(
        ({ resourceName, values }: { resourceName: string; values: string }) =>
            create(resourceName, values),
        {
            onSuccess: (data) => {
                if (canEdit) {
                    return history.push(
                        `/resources/${resourceName}/edit/${data.data.id}`,
                    );
                }

                return history.push(`/resources/${resourceName}`);
            },
        },
    );

    const onFinish = async (values: any) => {
        mutation.mutate({ resourceName, values });
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName,
                onFinish,
                error: mutation.error,
                isLoading: mutation.isLoading,
            });
        }
        return child;
    });

    return (
        <Card title={`Create ${pluralize.singular(resourceName)}`}>
            {childrenWithProps}
        </Card>
    );
};
