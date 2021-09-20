import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import pluralize from "pluralize";

import { DataContext } from "@contexts/data";
import {
    DeleteManyResponse,
    IDataContext,
    HttpError,
    BaseRecord,
    MutationMode,
    ContextQuery,
    QueryResponse,
    GetListResponse,
    Context as DeleteContext,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";
import {
    useTranslate,
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
    useCheckError,
} from "@hooks";
import { ActionTypes } from "@contexts/notification";
import { handleNotification } from "@definitions";

type DeleteManyParams = {
    ids: string[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

type UseDeleteManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
> = UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams,
    unknown
>;

/**
 * `useDeleteMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple delete mutations.
 *
 * It uses `deleteMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useDeleteMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
export const useDeleteMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(): UseDeleteManyReturnType<TData, TError> => {
    const { mutate: checkError } = useCheckError();
    const { deleteMany } = useContext<IDataContext>(DataContext);
    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();

    const { notificationDispatch } = useCancelNotification();
    const translate = useTranslate();
    const cacheQueries = useCacheQueries();

    const queryClient = useQueryClient();

    const mutation = useMutation<
        DeleteManyResponse<TData>,
        TError,
        DeleteManyParams,
        DeleteContext
    >(
        ({
            resource,
            ids,
            mutationMode,
            undoableTimeout,
            onCancel,
            metaData,
        }: DeleteManyParams) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;
            if (!(mutationModePropOrContext === "undoable")) {
                return deleteMany<TData>({ resource, ids, metaData });
            }

            const updatePromise = new Promise<DeleteManyResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        deleteMany<TData>({ resource, ids, metaData })
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
            onMutate: async ({ ids, resource, mutationMode }) => {
                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;
                const previousQueries: ContextQuery[] = [];

                const allQueries = cacheQueries(resource, ids);

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
                                const { data, total } =
                                    previousQuery as GetListResponse<TData>;

                                queryClient.setQueryData(queryKey, {
                                    ...previousQuery,
                                    data: (data ?? []).filter(
                                        (record: TData) =>
                                            !ids
                                                .map((p) => p.toString())
                                                .includes(
                                                    record.id!.toString(),
                                                ),
                                    ),
                                    total: total - ids.length,
                                });
                            } else {
                                queryClient.removeQueries(queryKey);
                            }
                        }
                    }
                }

                return {
                    previousQueries: previousQueries,
                };
            },
            // Always refetch after error or success:
            onSettled: (_data, _error, { resource, ids }) => {
                const allQueries = cacheQueries(resource, ids);
                for (const query of allQueries) {
                    if (
                        !query.queryKey.includes(`resource/getOne/${resource}`)
                    ) {
                        queryClient.invalidateQueries(query.queryKey);
                    }
                }

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id: ids, resource },
                });
            },
            onSuccess: (_data, { ids, resource, successNotification }) => {
                handleNotification(successNotification, {
                    key: `${ids}-${resource}-notification`,
                    message: translate("notifications.success", "Success"),
                    description: translate(
                        "notifications.deleteSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
                            ),
                        },
                        `Successfully deleted ${resource}`,
                    ),
                    type: "success",
                });
            },
            onError: (err, { ids, resource, errorNotification }, context) => {
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError(err);
                    const resourceSingular = pluralize.singular(resource);

                    handleNotification(errorNotification, {
                        key: `${ids}-${resource}-notification`,
                        message: translate(
                            "notifications.deleteError",
                            {
                                resource: resourceSingular,
                                statusCode: err.statusCode,
                            },
                            `Error (status code: ${err.statusCode})`,
                        ),
                        description: err.message,
                    });
                }
            },
        },
    );

    return mutation;
};
