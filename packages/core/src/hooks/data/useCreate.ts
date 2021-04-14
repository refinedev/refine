import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { DataContext } from "@contexts/data";
import { CreateResponse, IDataContext, BaseRecord } from "../../interfaces";
import { useListResourceQueries, useTranslate, useNotification } from "@hooks";

type UseCreateReturnType<
    TParams extends BaseRecord = BaseRecord
> = UseMutationResult<
    CreateResponse,
    unknown,
    {
        resource: string;
        values: TParams;
    },
    unknown
>;

export const useCreate = <
    TParams extends BaseRecord = BaseRecord
>(): UseCreateReturnType<TParams> => {
    const { create } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const notification = useNotification();
    const queryClient = useQueryClient();

    const mutation = useMutation(
        ({ resource, values }: { resource: string; values: TParams }) =>
            create<TParams>(resource, values),
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
                        `There was an error creating in ${resource}`,
                    ),
                });
            },
        },
    );

    return mutation;
};
