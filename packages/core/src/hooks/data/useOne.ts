import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import { DataContext } from "@contexts/data";
import {
    GetOneResponse,
    IDataContext,
    HttpError,
    BaseRecord,
    MetaDataQuery,
    LiveModeProps,
} from "../../interfaces";
import { useCheckError, useTranslate, useResourceSubscription } from "@hooks";
import { ArgsProps } from "antd/lib/notification";
import { handleNotification } from "@definitions";

export type UseOneProps<TData, TError> = {
    resource: string;
    id: string;
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>;
    successNotification?: ArgsProps | false;
    errorNotification?: ArgsProps | false;
    metaData?: MetaDataQuery;
} & LiveModeProps;

/**
 * `useOne` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving single items from a `resource`.
 *
 * It uses `getOne` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useOne} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 *
 */
export const useOne = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    id,
    queryOptions,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    liveParams,
}: UseOneProps<TData, TError>): QueryObserverResult<GetOneResponse<TData>> => {
    const { getOne } = useContext<IDataContext>(DataContext);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();

    useResourceSubscription({
        resource,
        types: ["*"],
        channel: `resources/${resource}`,
        params: { ids: id ? [id.toString()] : [], ...liveParams },
        enabled: queryOptions?.enabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetOneResponse<TData>, TError>(
        [`resource/getOne/${resource}`, { id, ...metaData }],
        () => getOne<TData>({ resource, id, metaData }),
        {
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);
                handleNotification(successNotification);
            },
            onError: (err: TError) => {
                checkError(err);
                queryOptions?.onError?.(err);

                handleNotification(errorNotification, {
                    key: `${id}-${resource}-getOne-notification`,
                    message: translate(
                        "notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                    type: "error",
                });
            },
        },
    );

    return queryResponse;
};
