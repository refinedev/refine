import React, { Dispatch, SetStateAction } from "react";
import { QueryObserverResult } from "react-query";
import { FormInstance, FormProps } from "antd";

import { useOne, useRouterContext } from "@pankod/refine-core";
import {
    GetOneResponse,
    HttpError,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { useCreateForm, useCreateFormProps } from "../useCreateForm";
import { UseCreateReturnType } from "@pankod/refine-core/dist/hooks/data/useCreate";

import { ActionParams } from "../useForm";
import { BaseRecord } from "@pankod/refine-core/dist/interfaces";

export type useCloneFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useCreateFormProps<TData, TError, TVariables> & {
    cloneId?: string;
} & ActionParams;

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

    const { useParams } = useRouterContext();

    const { id: idFromRoute, action: actionFromRoute } =
        useParams<ResourceRouterParams>();

    const id = props.cloneId ?? idFromRoute;

    const action = props.action ?? actionFromRoute;
    // Check if clone process comes from useParams or modal
    const isClone = action === "clone" && id !== undefined;

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
