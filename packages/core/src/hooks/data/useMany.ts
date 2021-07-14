import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import { ArgsProps } from "antd/lib/notification";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    GetManyResponse,
    HttpError,
} from "../../interfaces";
import { useCheckError } from "@hooks";
import { useTranslate } from "@hooks/translate";
import { handleNotification } from "@definitions";

export const useMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    resource: string,
    ids: string[],
    queryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>,
    successNotification?: ArgsProps | false,
    errorNotification?: ArgsProps | false,
): QueryObserverResult<GetManyResponse<TData>> => {
    const { getMany } = useContext<IDataContext>(DataContext);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();

    const queryResponse = useQuery<GetManyResponse<TData>, TError>(
        [`resource/getMany/${resource}`, ids],
        () => getMany<TData>(resource, ids),
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
                    key: `${ids[0]}-${resource}-getMany-notification`,
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
