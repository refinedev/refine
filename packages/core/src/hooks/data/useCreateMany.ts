import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    CreateManyResponse,
    HttpError,
} from "../../interfaces";
import { useListResourceQueries, useNotification, useTranslate } from "@hooks";

type UseCreateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {}
> = UseMutationResult<
    CreateManyResponse<TData>,
    TError,
    { resource: string; values: TVariables[] },
    unknown
>;

export const useCreateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
>(): UseCreateManyReturnType<TData, TError, TVariables> => {
    const { createMany } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const queryClient = useQueryClient();
    const notification = useNotification();

    const mutation = useMutation<
        CreateManyResponse<TData>,
        TError,
        {
            resource: string;
            values: TVariables[];
        }
    >(
        ({ resource, values }: { resource: string; values: TVariables[] }) =>
            createMany<TData, TVariables>(resource, values),
        {
            onSuccess: (_, { resource }) => {
                notification.success({
                    description: translate(
                        "common:notifications.createSuccess",
                        { resource },
                        "Successfully Created",
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
                notification.error({
                    description: err.message,
                    message: translate(
                        "common:notifications.createError",
                        { resource },
                        `There was an error creating ${resource} (status code: ${err.statusCode}`,
                    ),
                });
            },
        },
    );

    return mutation;
};
