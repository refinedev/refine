import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import pluralize from "pluralize";

import { DataContext } from "@contexts/data";
import {
    CreateResponse,
    IDataContext,
    BaseRecord,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
    ILiveContext,
} from "../../interfaces";
import { useTranslate, useCheckError, useCacheQueries } from "@hooks";
import { handleNotification } from "@definitions";
import { LiveContext } from "@contexts/live";

type useCreateParams<TVariables> = {
    resource: string;
    values: TVariables;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

export type UseCreateReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCreateParams<TVariables>,
    unknown
>;

/**
 * `useCreate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses `create` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCreate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useCreate = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCreateReturnType<TData, TError, TVariables> => {
    const { mutate: checkError } = useCheckError();
    const { create } = useContext<IDataContext>(DataContext);
    const getAllQueries = useCacheQueries();
    const translate = useTranslate();
    const queryClient = useQueryClient();

    const liveContext = useContext<ILiveContext>(LiveContext);

    const mutation = useMutation<
        CreateResponse<TData>,
        TError,
        useCreateParams<TVariables>,
        unknown
    >(
        ({ resource, values, metaData }: useCreateParams<TVariables>) =>
            create<TData, TVariables>({
                resource,
                variables: values,
                metaData,
            }),
        {
            onSuccess: (
                data,
                { resource, successNotification: successNotificationFromProp },
            ) => {
                const resourceSingular = pluralize.singular(resource);

                handleNotification(successNotificationFromProp, {
                    description: translate(
                        "notifications.createSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully created ${resourceSingular}`,
                    ),
                    message: translate("notifications.success", "Success"),
                    type: "success",
                });

                getAllQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                    console.log("query, ", query);
                });

                liveContext?.publish?.({
                    channel: `resources/${resource}`,
                    type: "created",
                    payload: [
                        {
                            id: data.data.id,
                        },
                    ],
                    date: new Date(),
                });
            },
            onError: (
                err: TError,
                { resource, errorNotification: errorNotificationFromProp },
            ) => {
                checkError(err);
                const resourceSingular = pluralize.singular(resource);

                handleNotification(errorNotificationFromProp, {
                    description: err.message,
                    message: translate(
                        "notifications.createError",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                            statusCode: err.statusCode,
                        },
                        `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
                    ),
                    type: "error",
                });
            },
        },
    );

    return mutation;
};
