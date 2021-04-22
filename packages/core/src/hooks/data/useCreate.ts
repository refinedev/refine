import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import pluralize from "pluralize";

import { DataContext } from "@contexts/data";
import {
    CreateResponse,
    IDataContext,
    BaseRecord,
    HttpError,
} from "../../interfaces";
import { useListResourceQueries, useTranslate, useNotification } from "@hooks";

export type UseCreateReturnType<
    RecordType extends BaseRecord = BaseRecord
> = UseMutationResult<
    CreateResponse<RecordType>,
    unknown,
    {
        resource: string;
        values: BaseRecord;
    },
    unknown
>;

export const useCreate = <
    RecordType extends BaseRecord = BaseRecord
>(): UseCreateReturnType<RecordType> => {
    const { create } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const notification = useNotification();
    const queryClient = useQueryClient();

    const mutation = useMutation(
        ({ resource, values }: { resource: string; values: BaseRecord }) =>
            create<RecordType>(resource, values),
        {
            onSuccess: (_, { resource }) => {
                const resourceSingular = pluralize.singular(resource);

                notification.success({
                    description: translate(
                        "common:notifications.createSuccess",
                        { resource },
                        `Successfully created ${resourceSingular}`,
                    ),
                    message: translate(
                        "common:notifications.success",
                        "Success",
                    ),
                });

                getListQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });
            },
            onError: (err: HttpError, { resource }) => {
                const resourceSingular = pluralize.singular(resource);

                notification.error({
                    description: err.message,
                    message: translate(
                        "common:notifications.createError",
                        { resourceSingular, statusCode: err.statusCode },
                        `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
                    ),
                });
            },
        },
    );

    return mutation;
};
