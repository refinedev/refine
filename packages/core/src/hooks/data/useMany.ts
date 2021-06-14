import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import { notification } from "antd";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    GetManyResponse,
    HttpError,
} from "../../interfaces";
import { useCheckError } from "@hooks";
import { useTranslate } from "@hooks/translate";

export const useMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    resource: string,
    ids: string[],
    options?: UseQueryOptions<GetManyResponse<TData>, TError>,
): QueryObserverResult<GetManyResponse<TData>> => {
    const { getMany } = useContext<IDataContext>(DataContext);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();

    const queryResponse = useQuery<GetManyResponse<TData>, TError>(
        [`resource/getMany/${resource}`, ids],
        () => getMany<TData>(resource, ids),
        {
            ...options,
            onError: (err: TError) => {
                checkError(err);
                options?.onError?.(err);

                notification.error({
                    key: `${ids[0]}-${resource}-notification`,
                    message: translate(
                        "notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                });
            },
        },
    );

    return queryResponse;
};
