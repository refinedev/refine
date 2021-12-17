import React, { Dispatch, SetStateAction } from "react";
import { QueryObserverResult } from "react-query";
import { FormInstance, FormProps } from "antd";

import { useResourceWithRoute, useRouterContext } from "@hooks";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";
import { useCloneForm, useCloneFormProps } from "./useCloneForm";
import { ButtonProps } from "../../components/antd";

import {
    BaseRecord,
    GetOneResponse,
    HttpError,
    LiveModeProps,
    ResourceRouterParams,
} from "../../interfaces";
import { UseUpdateReturnType } from "../data/useUpdate";
import { UseCreateReturnType } from "../data/useCreate";

export type ActionParams = {
    action?: "edit" | "create" | "clone";
};

type ActionFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useCreateFormProps<TData, TError, TVariables> &
    useEditFormProps<TData, TError, TVariables> &
    useCloneFormProps<TData, TError, TVariables>;

type ResourcelessActionFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = Omit<ActionFormProps<TData, TError, TVariables>, "resource">;

export type useFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = ActionParams & {
    resource?: string;
} & ResourcelessActionFormProps<TData, TError, TVariables> &
    LiveModeProps;

export type UseFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    // form: FormInstance<TVariables>;
    // formProps: FormProps<TVariables>;
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    // saveButtonProps: ButtonProps & {
    //     onClick: () => void;
    // };
    queryResult?: QueryObserverResult<GetOneResponse<TData>>;
    mutationResult:
        | UseUpdateReturnType<TData, TError, TVariables>
        | UseCreateReturnType<TData, TError, TVariables>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
    onFinish: (values: TVariables) => Promise<void>;
};

/**
 * `useForm` is used to manage forms. It uses Ant Design {@link https://ant.design/components/form/ Form} data scope management under the hood and returns the required props for managing the form actions.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/form/useForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    action: actionFromProps,
    resource: resourceFromProps,
    ...rest
}: useFormProps<TData, TError, TVariables> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables
> => {
    // id state is needed to determine selected record in addition to id parameter from route
    // this could be moved to a custom hook that encapsulates both create and clone form hooks.
    const [cloneId, setCloneId] = React.useState<string>();

    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const {
        resource: resourceFromParams,
        action: actionFromRoute,
        id,
    } = useParams<ResourceRouterParams>();

    const resourceType = resourceFromProps ?? resourceFromParams;
    const action = actionFromProps ?? actionFromRoute;

    const resource = resourceWithRoute(resourceType);

    const editForm = useEditForm<TData, TError, TVariables>({
        ...rest,
        resource,
        action,
    } as useEditFormProps<TData, TError, TVariables>);

    const createForm = useCreateForm<TData, TError, TVariables>({
        ...rest,
        resource,
        action,
    } as useCreateFormProps<TData, TError, TVariables>);

    const cloneForm = useCloneForm<TData, TError, TVariables>({
        ...rest,
        resource,
        cloneId,
        action,
    } as useCloneFormProps<TData, TError, TVariables>);

    switch (action) {
        case "create":
            return { ...createForm };
        case "edit":
            return editForm;
        case "clone":
            // setCloneId and cloneId needs to be returned from both clone and create cases.
            // It is needed to make them accessible in useModalForm to be able to manage id state.
            return { ...cloneForm, setCloneId, cloneId };
        default:
            return createForm;
    }
};
