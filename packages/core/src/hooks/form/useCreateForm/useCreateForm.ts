import { Dispatch, SetStateAction } from "react";

import {
    useCreate,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
} from "@hooks";
import { UseCreateReturnType } from "../../data/useCreate";

import {
    BaseRecord,
    RedirectionTypes,
    CreateResponse,
    IResourceItem,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../../interfaces";

export type useCreateForm<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    editId?: string;
    setEditId?: Dispatch<SetStateAction<string | undefined>>;
    formLoading: boolean;
    mutationResult: UseCreateReturnType<TData, TError, TVariables>;
    setCloneId?: Dispatch<SetStateAction<string | undefined>>;
    cloneId?: string;
    onFinish: (values: TVariables) => Promise<void>;
};

export type useCreateFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    onMutationSuccess?: (
        data: CreateResponse<TData>,
        variables: TVariables,
        context: any,
    ) => void;
    onMutationError?: (
        error: TError,
        variables: TVariables,
        context: any,
    ) => void;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    resource: IResourceItem;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

/**
 * A hook that the `useForm` uses
 * @internal
 */
export const useCreateForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    onMutationSuccess,
    onMutationError,
    redirect = "edit",
    resource,
    successNotification,
    errorNotification,
    metaData,
}: useCreateFormProps<TData, TError, TVariables>): useCreateForm<
    TData,
    TError,
    TVariables
> => {
    const { setWarnWhen } = useWarnAboutChange();

    const mutationResult = useCreate<TData, TError, TVariables>();
    const { mutate, isLoading } = mutationResult;

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = async (values: TVariables) => {
        setWarnWhen(false);
        mutate(
            {
                values,
                resource: resource.name,
                successNotification,
                errorNotification,
                metaData,
            },
            {
                onSuccess: (data, variables, context) => {
                    if (onMutationSuccess) {
                        onMutationSuccess(data, values, context);
                    }

                    const id = data?.data?.id;

                    handleSubmitWithRedirect({
                        redirect,
                        resource,
                        id,
                    });
                },
                onError: (error: TError, variables, context) => {
                    if (onMutationError) {
                        return onMutationError(error, values, context);
                    }
                },
            },
        );
    };

    return {
        formLoading: isLoading,
        mutationResult,
        onFinish,
    };
};
