import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    GetOneResponse,
    IDataContext,
    HttpError,
    BaseRecord,
} from "../../interfaces";
import { useNotification, useTranslate } from "@hooks";

export const useOne = <RecordType extends BaseRecord = BaseRecord>(
    resource: string,
    id: string,
    options?: UseQueryOptions<GetOneResponse<RecordType>, HttpError>,
): QueryObserverResult<GetOneResponse<RecordType>> => {
    const { getOne } = useContext<IDataContext>(DataContext);
    const notification = useNotification();
    const translate = useTranslate();

    const queryResponse = useQuery<GetOneResponse<RecordType>, HttpError>(
        [`resource/getOne/${resource}`, { id }],
        () => getOne<RecordType>(resource, id),
        {
            ...options,
            onError: (err: HttpError) => {
                if (options?.onError) {
                    options.onError(err);
                }

                notification.error({
                    key: `${id}-${resource}-notification`,
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
