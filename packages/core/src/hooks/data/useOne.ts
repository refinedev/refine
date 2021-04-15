import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, IDataContext, HttpError } from "../../interfaces";
import { useNotification, useTranslate } from "@hooks";

export const useOne = (
    resource: string,
    id: string,
    options?: UseQueryOptions<GetOneResponse, HttpError>,
): QueryObserverResult<GetOneResponse> => {
    const { getOne } = useContext<IDataContext>(DataContext);
    const notification = useNotification();
    const translate = useTranslate();

    const queryResponse = useQuery<GetOneResponse, HttpError>(
        [`resource/getOne/${resource}`, { id }],
        () => getOne(resource, id),
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
