import React, { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";
import { FormInstance, FormProps } from "antd";

import { useOne, useResourceWithRoute } from "@hooks";
import {
    GetOneResponse,
    ResourceRouterParams,
    UseFormSFFormProps,
} from "../../../interfaces";
import { useCreateForm, useCreateFormProps } from "../useCreateForm";
import { UseCreateReturnType } from "../../data/useCreate";

export type useCloneFormProps<T> = useCreateFormProps<T> & {
    cloneId?: string | number;
};

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useCloneForm<T> = {
    form: FormInstance;
    formProps: UseFormSFFormProps & FormProps;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<T>;
    queryResult: QueryObserverResult<GetOneResponse<T>>;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export const useCloneForm = <RecordType>(
    props: useCloneFormProps<RecordType>,
): useCloneForm<RecordType> => {
    const useCreateFormProps = useCreateForm<RecordType>({ ...props });

    const { form, formLoading, mutationResult } = useCreateFormProps;

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

    const queryResult = useOne<RecordType>(resource.name, id, {
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
        mutationResult,
        queryResult,
    };
};
