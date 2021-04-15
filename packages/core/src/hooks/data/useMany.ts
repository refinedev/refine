import { useContext } from "react";
import { QueryObserverResult, useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    Identifier,
    GetManyResponse,
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

    const queryResponse = useQuery<GetManyResponse<BaseRecord>, Error>(
        `resource/list/${resource}`,
        () => getMany(resource, ids),
        {
            onError: (err: Error) => {
                notification.error({
                    message: translate("common:notifications.error", "Error"),
                    description: err.message,
                });
            },
        },
    );

    return queryResponse;
};
