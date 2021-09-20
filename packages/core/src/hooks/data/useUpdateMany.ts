import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import pluralize from "pluralize";

import { DataContext } from "@contexts/data";
import {
    useCacheQueries,
    useCancelNotification,
    useCheckError,
    useMutationMode,
    useTranslate,
} from "@hooks";
import { ActionTypes } from "@contexts/notification";
import {
    IDataContext,
    BaseRecord,
    UpdateManyResponse,
    HttpError,
    MutationMode,
    ContextQuery,
    QueryResponse,
    Context as UpdateContext,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";
import { handleNotification } from "@definitions/helpers";

type UpdateManyParams<TVariables> = {
    ids: string[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

type UseUpdateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    UpdateManyResponse<TData>,
    TError,
    UpdateManyParams<TVariables>,
    UpdateContext
>;

/**
 * `useUpdateMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple update mutations.
 *
 * It uses `updateMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useUpdateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useUpdateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseUpdateManyReturnType<TData, TError, TVariables> => {
    const queryClient = useQueryClient();
    const translate = useTranslate();
    const { updateMany } = useContext<IDataContext>(DataContext);
    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const { mutate: checkError } = useCheckError();

    const { notificationDispatch } = useCancelNotification();

    const getAllQueries = useCacheQueries();

    const mutation = useMutation<
        UpdateManyResponse<TData>,
        TError,
        UpdateManyParams<TVariables>,
        UpdateContext
    >(
        ({
            ids,
            values,
            resource,
            onCancel,
            mutationMode,
            undoableTimeout,
            metaData,
        }: UpdateManyParams<TVariables>) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return updateMany<TData, TVariables>({
                    resource,
                    ids,
                    variables: values,
                    metaData,
                });
            }

            const updatePromise = new Promise<UpdateManyResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        updateMany<TData, TVariables>({
                            resource,
                            ids,
                            variables: values,
                            metaData,
                        })
                            .then((result) => resolve(result))
                            .catch((err) => reject(err));
                    };

                    const cancelMutation = () => {
                        reject({ message: "mutationCancelled" });
                    };

                    if (onCancel) {
                        onCancel(cancelMutation);
                    }

                    notificationDispatch({
                        type: ActionTypes.ADD,
                        payload: {
                            id: ids,
                            resource: resource,
                            cancelMutation: cancelMutation,
                            doMutation: doMutation,
                            seconds: undoableTimeoutPropOrContext,
                            isSilent: !!onCancel,
                        },
                    });
                },
            );
            return updatePromise;
        },

        {
            onMutate: async ({ resource, ids, values, mutationMode }) => {
                const previousQueries: ContextQuery[] = [];
                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                const allQueries = getAllQueries(resource, ids);

                for (const queryItem of allQueries) {
                    const { queryKey } = queryItem;
                    await queryClient.cancelQueries(queryKey, undefined, {
                        silent: true,
                    });

                    const previousQuery =
                        queryClient.getQueryData<QueryResponse<TData>>(
                            queryKey,
                        );

                    if (!(mutationModePropOrContext === "pessimistic")) {
                        if (previousQuery) {
                            previousQueries.push({
                                query: previousQuery,
                                queryKey,
                            });

                            if (
                                queryKey.includes(`resource/list/${resource}`)
                            ) {
                                const { data } = previousQuery;

                                queryClient.setQueryData(queryKey, {
                                    ...previousQuery,
                                    data: data.map((record: TData) => {
                                        if (
                                            ids
                                                .map((p) => p.toString())
                                                .includes(record.id!.toString())
                                        ) {
                                            return {
                                                ...record,
                                                ...values,
                                            };
                                        }
                                        return record;
                                    }),
                                });
                            } else {
                                queryClient.setQueryData(queryKey, {
                                    data: {
                                        ...previousQuery.data,
                                        ...values,
                                    },
                                });
                            }
                        }
                    }
                }

                return {
                    previousQueries: previousQueries,
                };
            },
            onError: (
                err: TError,
                { ids, resource, errorNotification },
                context,
            ) => {
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError?.(err);

                    const resourceSingular = pluralize.singular(resource);

                    handleNotification(errorNotification, {
                        key: `${ids}-${resource}-updateMany-error-notification`,
                        message: translate(
                            "notifications.editError",
                            {
                                resource: resourceSingular,
                                statusCode: err.statusCode,
                            },
                            `Error when updating ${resourceSingular} (status code: ${err.statusCode})`,
                        ),
                        description: err.message,
                        type: "error",
                    });
                }
            },
            onSettled: (_data, _error, { ids, resource }) => {
                const allQueries = getAllQueries(resource, ids);
                for (const query of allQueries) {
                    queryClient.invalidateQueries(query.queryKey);
                }

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id: ids, resource },
                });
            },
            onSuccess: (_data, { ids, resource, successNotification }) => {
                const resourceSingular = pluralize.singular(resource);

                handleNotification(successNotification, {
                    key: `${ids}-${resource}-notification`,
                    message: translate("notifications.success", "Successful"),
                    description: translate(
                        "notifications.editSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
                            ),
                        },
                        `Successfully updated ${resourceSingular}`,
                    ),
                    type: "success",
                });
            },
        },
    );

    return mutation;
};
