import React from "react";
import { useParams } from "react-router-dom";

import { useOne, useResourceWithRoute } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";
import { useCreateFormProps } from "..";
import { useCreateForm } from "../useCreateForm";

export type useCloneFormProps = useCreateFormProps & {
    cloneId?: string | number;
};

export const useCloneForm = (props: useCloneFormProps) => {
    const useCreateFormProps = useCreateForm({ ...props });

    const { form, formLoading } = useCreateFormProps;

    const {
        resource: routeResourceName,
        id: idFromRoute,
        action,
    } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

    const id = props.cloneId?.toString() ?? idFromRoute;
    // Check if clone process comes from useParams or modal
    const isClone = (action === "create" && !!id) || !!id;

    const queryResult = useOne(resource.name, id, {
        enabled: isClone,
    });

    const { data, isFetching } = queryResult;

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
        return () => {
            form.resetFields();
        };
    }, [data, id, isFetching]);

    return {
        ...useCreateFormProps,
        formLoading: formLoading || isFetching,
        queryResult,
    };
};
