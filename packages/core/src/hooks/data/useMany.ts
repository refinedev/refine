import { useContext } from "react";
import { QueryObserverResult, useQuery } from "react-query";

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

export const useMany = (
    resource: string,
    ids: Identifier[],
): QueryObserverResult<GetManyResponse<BaseRecord>> => {
    const { getMany } = useContext<IDataContext>(DataContext);
    const notification = useNotification();
    const translate = useTranslate();

    const queryResponse = useQuery<GetManyResponse<BaseRecord>, HttpError>(
        `resource/list/${resource}`,
        () => getMany(resource, ids),
        {
            onError: (err: HttpError) => {
                notification.error({
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
