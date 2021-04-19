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
            onError: (err: HttpError, { resource }) => {
                const resourceSingular = pluralize.singular(resource);

                notification.error({
                    description: err.message,
                    message: translate(
                        "common:notifications.createError",
                        { resourceSingular, statusCode: err.statusCode },
                        `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
                    ),
                });
            },
        },
    );

    return mutation;
};
