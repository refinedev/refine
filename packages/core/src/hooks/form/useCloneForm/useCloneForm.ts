import React, { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";
import { FormInstance, FormProps } from "antd";

import { useOne } from "@hooks";
import {
    BaseRecord,
    GetOneResponse,
    HttpError,
    ResourceRouterParams,
} from "../../../interfaces";
import { useCreateForm, useCreateFormProps } from "../useCreateForm";
import { UseCreateReturnType } from "../../data/useCreate";

export type useCloneFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useCreateFormProps<TData, TError, TVariables> & {
    cloneId?: string;
};

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useCloneForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    form: FormInstance<TVariables>;
    formProps: FormProps<TVariables>;
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    saveButtonProps: SaveButtonProps;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<TData, TError, TVariables>;
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
};

/**
 * A hook that the `useForm` uses
 * @internal
 */
export const useCloneForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(
    props: useCloneFormProps<TData, TError, TVariables>,
): useCloneForm<TData, TError, TVariables> => {
    const useCreateFormProps = useCreateForm<TData, TError, TVariables>({
        ...props,
    });

    const { form, formLoading, mutationResult } = useCreateFormProps;

    const { id: idFromRoute, action } = useParams<ResourceRouterParams>();

    const id = props.cloneId ?? idFromRoute;
    // Check if clone process comes from useParams or modal
    const isClone = (action === "create" && !!id) || !!id;

    const queryResult = useOne<TData>({
        resource: props.resource.name,
        id,
        queryOptions: {
            enabled: isClone,
        },
        metaData: props.metaData,
    });

    const { data, isFetching } = queryResult;

    React.useEffect(() => {
        form.setFieldsValue({
            ...(data?.data as any), // Fix Me
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
