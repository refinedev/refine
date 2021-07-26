import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    GetOneResponse,
    IDataContext,
    HttpError,
    BaseRecord,
} from "../../interfaces";
import { useCheckError, useTranslate } from "@hooks";
import { ArgsProps } from "antd/lib/notification";
import { handleNotification } from "@definitions";

export const useOne = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    resource: string,
    id: string,
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>,
    successNotification?: ArgsProps | false,
    errorNotification?: ArgsProps | false,
): QueryObserverResult<GetOneResponse<TData>> => {
    const { getOne } = useContext<IDataContext>(DataContext);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();

    const queryResponse = useQuery<GetOneResponse<TData>, TError>(
        [`resource/getOne/${resource}`, { id }],
        () => getOne<TData>(resource, id),
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
