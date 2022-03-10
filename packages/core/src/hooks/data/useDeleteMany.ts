import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import pluralize from "pluralize";

import {
    DeleteManyResponse,
    HttpError,
    BaseRecord,
    BaseKey,
    MutationMode,
    PreviousQuery,
    GetListResponse,
    PrevContext as DeleteContext,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";
import {
    useTranslate,
    useMutationMode,
    useCancelNotification,
    useCheckError,
    usePublish,
    useHandleNotification,
    useDataProvider,
} from "@hooks";
import { ActionTypes } from "@contexts/undoableQueue";
import { queryKeys } from "@definitions";

type DeleteManyParams = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
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
 * @see {@link https://refine.dev/docs/core/hooks/data/useDeleteMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
export const useDeleteMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(): UseDeleteManyReturnType<TData, TError> => {
    const { mutate: checkError } = useCheckError();

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const dataProvider = useDataProvider();

    const { notificationDispatch } = useCancelNotification();
    const translate = useTranslate();
    const publish = usePublish();
    const handleNotification = useHandleNotification();

    const queryClient = useQueryClient();

    const mutation = useMutation<
        DeleteManyResponse<TData>,
        TError,
        DeleteManyParams,
        DeleteContext<TData>
    >(
        ({
            resource,
            ids,
            mutationMode,
            undoableTimeout,
            onCancel,
            metaData,
            dataProviderName,
        }: DeleteManyParams) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;
            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(dataProviderName).deleteMany<TData>({
                    resource,
                    ids,
                    metaData,
                });
            }

            const updatePromise = new Promise<DeleteManyResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(dataProviderName)
                            .deleteMany<TData>({ resource, ids, metaData })
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
            onMutate: async ({
                ids,
                resource,
                mutationMode,
                dataProviderName,
            }) => {
                const queryKey = queryKeys(resource, dataProviderName);

                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                await queryClient.cancelQueries(
                    queryKey.resourceAll,
                    undefined,
                    {
                        silent: true,
                    },
                );

                const previousQueries: PreviousQuery<TData>[] =
                    queryClient.getQueriesData(queryKey.resourceAll);

                if (!(mutationModePropOrContext === "pessimistic")) {
                    // Set the previous queries to the new ones:
                    queryClient.setQueriesData(
                        queryKey.list(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.filter(
                                (item) =>
                                    item.id &&
                                    !ids
                                        .map(String)
                                        .includes(item.id.toString()),
                            );

                            return {
                                data,
                                total: previous.total - 1,
                            };
                        },
                    );

                    queryClient.setQueriesData(
                        queryKey.many(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.filter(
                                (record: TData) => {
                                    if (record.id) {
                                        return !ids
                                            .map(String)
                                            .includes(record.id.toString());
                                    }
                                    return false;
                                },
                            );

                            return {
                                ...previous,
                                data,
                            };
                        },
                    );

                    for (const id of ids) {
                        queryClient.setQueriesData(
                            queryKey.detail(id),
                            (previous?: any | null) => {
                                if (!previous || previous.data.id == id) {
                                    return null;
                                }
                                return {
                                    ...previous,
                                };
                            },
                        );
                    }
                }

                return {
                    previousQueries,
                    queryKey,
                };
            },
            // Always refetch after error or success:
            onSettled: (_data, _error, { resource, ids }, context) => {
                // invalidate the cache for the list and many queries:
                queryClient.invalidateQueries(context?.queryKey.list());
                queryClient.invalidateQueries(context?.queryKey.many());

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id: ids, resource },
                });
            },
            onSuccess: (
                _data,
                { ids, resource, successNotification },
                context,
            ) => {
                // Remove the queries from the cache:
                ids.forEach((id) =>
                    queryClient.removeQueries(context.queryKey.detail(id)),
                );

                handleNotification(successNotification, {
                    key: `${ids}-${resource}-notification`,
                    description: translate("notifications.success", "Success"),
                    message: translate(
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

                publish?.({
                    channel: `resources/${resource}`,
                    type: "deleted",
                    payload: { ids },
                    date: new Date(),
                });
            },
            onError: (err, { ids, resource, errorNotification }, context) => {
                // set back the queries to the context:
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query[0], query[1]);
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
                        type: "error",
                    });
                }
            },
        },
    );

    return mutation;
};
