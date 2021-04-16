import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, IDataContext } from "../../interfaces";
import { useNotification, useTranslate } from "@hooks";

export const useOne = (
    resource: string,
    id: string,
    options?: UseQueryOptions<GetOneResponse, Error>,
): QueryObserverResult<GetOneResponse> => {
    const { getOne } = useContext<IDataContext>(DataContext);
    const notification = useNotification();
    const translate = useTranslate();

    const queryResponse = useQuery<GetOneResponse, Error>(
        [`resource/getOne/${resource}`, { id }],
        () => getOne(resource, id),
        {
            ...options,
            onError: (err: Error) => {
                if (options?.onError) {
                    options.onError(err);
                }

                notification.error({
                    key: `${id}-${resource}-notification`,
                    message: translate("common:notifications.error", "Error"),
                    description: err.message,
                });
            },
        },
    );

    return queryResponse;
};
