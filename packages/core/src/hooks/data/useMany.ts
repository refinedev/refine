import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    Identifier,
    GetManyResponse,
    HttpError,
} from "../../interfaces";
import { useNotification } from "@hooks";
import { useTranslate } from "@hooks/translate";

export const useMany = <RecordType extends BaseRecord = BaseRecord>(
    resource: string,
    ids: Identifier[],
    options?: UseQueryOptions<GetManyResponse<RecordType>, HttpError>,
): QueryObserverResult<GetManyResponse<RecordType>> => {
    const { getMany } = useContext<IDataContext>(DataContext);
    const notification = useNotification();
    const translate = useTranslate();

    const queryResponse = useQuery<GetManyResponse<RecordType>, HttpError>(
        [`resource/getMany/${resource}`, ids],
        () => getMany<RecordType>(resource, ids),
        {
            ...options,
            onError: (err: HttpError) => {
                options?.onError?.(err);

                notification.error({
                    key: `${ids[0]}-${resource}-notification`,
                    message: translate(
                        "common:notifications.error",
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
