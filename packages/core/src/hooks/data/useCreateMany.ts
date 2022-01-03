import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    CreateManyResponse,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";
import {
    useCacheQueries,
    useTranslate,
    usePublish,
    useHandleNotification,
} from "@hooks";
import pluralize from "pluralize";

type useCreateManyParams<TVariables> = {
    resource: string;
    values: TVariables[];
    metaData?: MetaDataQuery;
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

/**
 * `useCreateMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple create mutations.
 *
 * It uses `createMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCreateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useCreateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCreateManyReturnType<TData, TError, TVariables> => {
    const { createMany } = useContext<IDataContext>(DataContext);
    const getAllQueries = useCacheQueries();
    const translate = useTranslate();
    const queryClient = useQueryClient();
    const publish = usePublish();
    const handleNotification = useHandleNotification();

    const mutation = useMutation<
        CreateManyResponse<TData>,
        TError,
        useCreateManyParams<TVariables>
    >(
        ({ resource, values, metaData }: useCreateManyParams<TVariables>) =>
            createMany<TData, TVariables>({
                resource,
                variables: values,
                metaData,
            }),
        {
            onSuccess: (response, { resource, successNotification }) => {
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

                getAllQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });

                publish?.({
                    channel: `resources/${resource}`,
                    type: "created",
                    payload: {
                        ids: response.data
                            .filter((item) => item?.id !== undefined)
                            .map((item) => item.id!.toString()),
                    },
                    date: new Date(),
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
