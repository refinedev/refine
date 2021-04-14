import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { IDataContext, BaseRecord, CreateManyResponse } from "../../interfaces";
import { useListResourceQueries, useNotification, useTranslate } from "@hooks";

type UseCreateManyReturnType<
    T extends BaseRecord = BaseRecord
> = UseMutationResult<
    CreateManyResponse,
    unknown,
    { resource: string; values: T[] },
    unknown
>;

export const useCreateMany = <
    TParams extends BaseRecord = BaseRecord
>(): UseCreateManyReturnType<TParams> => {
    const { createMany } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const queryClient = useQueryClient();
    const notification = useNotification();

    const mutation = useMutation(
        ({ resource, values }: { resource: string; values: TParams[] }) =>
            createMany<TParams>(resource, values),
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
            onError: (e: Error, { resource }) => {
                notification.error({
                    description: e.message,
                    message: translate(
                        "common:notifications.createError",
                        { resource },
                        `There was an error creating in ${resource}!`,
                    ),
                });
            },
        },
    );

    return mutation;
};
