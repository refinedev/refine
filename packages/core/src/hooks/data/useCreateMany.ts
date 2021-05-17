import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    CreateManyResponse,
    HttpError,
} from "../../interfaces";
import { useListResourceQueries, useNotification, useTranslate } from "@hooks";

type UseCreateManyReturnType<
    RecordType extends BaseRecord = BaseRecord
> = UseMutationResult<
    CreateManyResponse<RecordType>,
    unknown,
    { resource: string; values: BaseRecord[] },
    unknown
>;

export const useCreateMany = <
    RecordType extends BaseRecord = BaseRecord
>(): UseCreateManyReturnType<RecordType> => {
    const { createMany } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const queryClient = useQueryClient();
    const notification = useNotification();

    const mutation = useMutation(
        ({ resource, values }: { resource: string; values: BaseRecord[] }) =>
            createMany<RecordType>(resource, values),
        {
            onSuccess: (_, { resource }) => {
                notification.success({
                    description: translate(
                        "common:notifications.createSuccess",
                        { resource },
                        "Successfully Created",
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
                notification.error({
                    description: err.message,
                    message: translate(
                        "common:notifications.createError",
                        { resource },
                        `There was an error creating ${resource} (status code: ${err.statusCode}`,
                    ),
                });
            },
        },
    );

    return mutation;
};
