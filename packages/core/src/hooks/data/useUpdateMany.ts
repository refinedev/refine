import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import pluralize from "pluralize";
import { ArgsProps } from "antd/lib/notification";

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
} from "../../interfaces";
import { handleNotification } from "@definitions/helpers";

type UpdateManyParams<TVariables> = {
    ids: string[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    successNotification?: ArgsProps | false;
    errorNotification?: ArgsProps | false;
};

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
        }: UpdateManyParams<TVariables>) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return updateMany<TData, TVariables>(resource, ids, values);
            }

            const updatePromise = new Promise<UpdateManyResponse<TData>>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        updateMany<TData, TVariables>(resource, ids, values)
                            .then((result) => resolve(result))
                            .catch((err) => reject(err));
                    }, undoableTimeoutPropOrContext);

                    const cancelMutation = () => {
                        clearTimeout(updateTimeout);
                        reject({ message: "mutationCancelled" });
                    };

                    if (onCancel) {
                        onCancel(cancelMutation);
                    } else {
                        notificationDispatch({
                            type: ActionTypes.ADD,
                            payload: {
                                id: ids,
                                resource: resource,
                                cancelMutation: cancelMutation,
                                seconds: undoableTimeoutPropOrContext,
                            },
                        });
                    }
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
                                            ids.includes(record.id!.toString())
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

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: {
                        ids,
                    },
                });

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
            },
            onSuccess: (_data, { ids, resource, successNotification }) => {
                const resourceSingular = pluralize.singular(resource);

                handleNotification(successNotification, {
                    key: `${ids}-${resource}-updateMany-success-notification`,
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
