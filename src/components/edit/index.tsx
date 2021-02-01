import React, { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "antd";

import { DataContext } from "@contexts/data";
import { GetOneResponse, IDataContext } from "@interfaces";

export interface EditProps {
    resourceName?: string;
}

export const Edit: React.FC<EditProps> = ({ resourceName, children }) => {
    const { update, getOne } = useContext<IDataContext>(DataContext);
    const history = useHistory();
    const { id } = useParams<Record<string, string | undefined>>();

    const [form] = Form.useForm();

    if (!resourceName || !id) {
        // TODO: render resource error page
        return null;
    }

    const { data } = useQuery<GetOneResponse>(
        `resource/getOne/${resourceName}`,
        () => getOne(resourceName, id),
    );

    // TODO: handle isError state

    form.setFieldsValue({
        ...data?.data,
    });

    const mutation = useMutation(
        ({ resourceName, values }: { resourceName: string; values: string }) =>
            update(resourceName, id, values),
        {
            onSuccess: () => {
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
                form,
                onFinish,
                error: mutation.error,
                isLoading: mutation.isLoading,
            });
        }
        return child;
    });

    return <section>{childrenWithProps}</section>;
};
