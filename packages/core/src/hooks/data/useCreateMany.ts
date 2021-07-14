import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    CreateManyResponse,
    HttpError,
    SuccessErrorNotification,
} from "../../interfaces";
import { useListResourceQueries, useTranslate } from "@hooks";
import { handleNotification } from "@definitions";
import pluralize from "pluralize";

type useCreateManyParams<TVariables> = {
    resource: string;
    values: TVariables[];
} & SuccessErrorNotification;

export type UseCreateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateManyResponse<TData>,
    TError,
    useCreateManyParams<TVariables>,
    unknown
>;

export const useCreateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCreateManyReturnType<TData, TError, TVariables> => {
    const { createMany } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        CreateManyResponse<TData>,
        TError,
        useCreateManyParams<TVariables>
    >(
        ({ resource, values }: useCreateManyParams<TVariables>) =>
            createMany<TData, TVariables>(resource, values),
        {
            onSuccess: (_, { resource, successNotification }) => {
                const resourcePlural = pluralize.plural(resource);

                handleNotification(successNotification, {
                    description: translate(
                        "notifications.createSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
                            ),
                        },
                        `Successfully created ${resourcePlural}`,
                    ),
                    message: translate("notifications.success", "Success"),
                    type: "success",
                });

                getListQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });
            },
            onError: (err: TError, { resource, errorNotification }) => {
                handleNotification(errorNotification, {
                    description: err.message,
                    message: translate(
                        "notifications.createError",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
                            ),
                            statusCode: err.statusCode,
                        },
                        `There was an error creating ${resource} (status code: ${err.statusCode}`,
                    ),
                    type: "error",
                });
            },
        },
    );

    return mutation;
};
