import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import pluralize from "pluralize";

import { DataContext } from "@contexts/data";
import {
    CreateResponse,
    IDataContext,
    BaseRecord,
    HttpError,
} from "../../interfaces";
import {
    useListResourceQueries,
    useTranslate,
    useNotification,
    useCheckError,
} from "@hooks";

export type UseCreateReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateResponse<TData>,
    TError,
    {
        resource: string;
        values: TVariables;
    },
    unknown
>;

export const useCreate = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCreateReturnType<TData, TError, TVariables> => {
    const checkError = useCheckError();
    const { create } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const notification = useNotification();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        CreateResponse<TData>,
        TError,
        {
            resource: string;
            values: TVariables;
        },
        unknown
    >(
        ({ resource, values }: { resource: string; values: TVariables }) =>
            create<TData, TVariables>(resource, values),
        {
            onSuccess: (_, { resource }) => {
                const resourceSingular = pluralize.singular(resource);

                notification.success({
                    description: translate(
                        "common:notifications.createSuccess",
                        { resource },
                        `Successfully created ${resourceSingular}`,
                    ),
                    message: translate(
                        "common:notifications.success",
                        "Success",
                    ),
                });

                getListQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });
            },
            onError: (err: TError, { resource }) => {
                checkError?.(err);
                const resourceSingular = pluralize.singular(resource);
                notification.error({
                    description: err.message,
                    message: translate(
                        "common:notifications.createError",
                        {
                            resource: resourceSingular,
                            statusCode: err.statusCode,
                        },
                        `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
                    ),
                });
            },
        },
    );

    return mutation;
};
