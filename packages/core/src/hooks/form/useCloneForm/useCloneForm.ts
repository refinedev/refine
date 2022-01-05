import { Dispatch, SetStateAction } from "react";
import { QueryObserverResult } from "react-query";

import { useOne, useRouterContext } from "@hooks";
import {
    BaseRecord,
    GetOneResponse,
    HttpError,
    ResourceRouterParams,
} from "../../../interfaces";
import { useCreateForm, useCreateFormProps } from "../useCreateForm";
import { UseCreateReturnType } from "../../data/useCreate";
import { ActionParams } from "../useForm";

export type useCloneFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useCreateFormProps<TData, TError, TVariables> & {
    cloneId?: string;
} & ActionParams;

export type useCloneForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<TData, TError, TVariables>;
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
    onFinish: (values: TVariables) => Promise<void>;
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

    const { formLoading, mutationResult } = useCreateFormProps;

    const { useParams } = useRouterContext();

    const { id: idFromRoute, action: actionFromRoute } =
        useParams<ResourceRouterParams>();

    const id = props.cloneId ?? idFromRoute;

    const action = props.action ?? actionFromRoute;
    // Check if clone process comes from useParams or modal
    const isClone = action === "clone" && id !== undefined;

    const queryResult = useOne<TData>({
        resource: props.resource.name,
        id: id ?? "",
        queryOptions: {
            enabled: isClone,
        },
        metaData: props.metaData,
    });

    const { data, isFetching } = queryResult;

    return {
        ...useCreateFormProps,
        formLoading: formLoading || isFetching,
        mutationResult,
        queryResult,
    };
};
