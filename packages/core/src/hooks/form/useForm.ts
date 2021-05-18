import React, { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";
import { FormInstance, FormProps } from "antd";

import { useResourceWithRoute } from "@hooks";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";
import { useCloneForm, useCloneFormProps } from "./useCloneForm";

import {
    BaseRecord,
    GetOneResponse,
    HttpError,
    ResourceRouterParams,
} from "../../interfaces";
import { UseUpdateReturnType } from "../data/useUpdate";
import { UseCreateReturnType } from "../data/useCreate";

export type ActionParams = {
    action?: "edit" | "create";
};

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

type ActionFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> =
    | useCreateFormProps<TData, TError, TVariables>
    | useEditFormProps<TData, TError, TVariables>
    | useCloneFormProps<TData, TError, TVariables>;

type ResourcelessActionFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = Omit<ActionFormProps<TData, TError, TVariables>, "resource">;

export type useFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = ActionParams & {
    resource?: string;
} & ResourcelessActionFormProps<TData, TError, TVariables>;

export type useForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = {
    form: FormInstance<TVariables>;
    formProps: FormProps<TVariables>;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    queryResult?: QueryObserverResult<GetOneResponse<TData>>;
    mutationResult:
        | UseUpdateReturnType<TData, TError, TVariables>
        | UseCreateReturnType<TData, TError, TVariables>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
>({
    action,
    resource: resourceFromProps,
    ...rest
}: useFormProps<TData, TError, TVariables> = {}): useForm<
    TData,
    TError,
    TVariables
> => {
    // id state is needed to determine selected record in addition to id parameter from route
    // this could be moved to a custom hook that encapsulates both create and clone form hooks.
    const [cloneId, setCloneId] = React.useState<string | number>();

    const resourceWithRoute = useResourceWithRoute();

    const { resource: resourceFromParams } = useParams<ResourceRouterParams>();

    const resourceType = resourceFromProps ?? resourceFromParams;

    const resource = resourceWithRoute(resourceType);

    const editForm = useEditForm<TData, TError, TVariables>({
        ...rest,
        resource,
    } as useEditFormProps<TData, TError, TVariables>);

    const createForm = useCreateForm<TData, TError, TVariables>({
        ...rest,
        resource,
    } as useCreateFormProps<TData, TError, TVariables>);

    const cloneForm = useCloneForm<TData, TError, TVariables>({
        ...rest,
        resource,
        cloneId,
    } as useCloneFormProps<TData, TError, TVariables>);

    const { action: actionFromRoute, id } = useParams<ResourceRouterParams>();

    switch (action || actionFromRoute) {
        case "create":
            // setCloneId and cloneId needs to be returned from both clone and create cases.
            // It is needed to make them accessible in useModalForm to be able to manage id state.

            // clone case
            if (cloneId || id) {
                return { ...cloneForm, setCloneId, cloneId };
            }
            // create case
            return { ...createForm, setCloneId, cloneId };
        case "edit":
            return editForm;
        default:
            return createForm;
    }
};
