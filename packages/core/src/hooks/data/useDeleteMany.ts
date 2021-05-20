import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    DeleteManyResponse,
    IDataContext,
    HttpError,
    BaseRecord,
    Identifier,
} from "../../interfaces";
import { useNotification, useTranslate } from "@hooks";

type UseDeleteManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError
> = UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    { ids: Identifier[] },
    unknown
>;

export const useDeleteMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError
>(
    resource: string,
): UseDeleteManyReturnType<TData, TError> => {
    const { deleteMany } = useContext<IDataContext>(DataContext);
    const notification = useNotification();
    const translate = useTranslate();

    if (!resource) {
        throw new Error("'resource' is required for useDelete hook.");
    }

    const queryClient = useQueryClient();

    const queryResource = `resource/list/${resource}`;

    const mutation = useMutation<
        DeleteManyResponse<TData>,
        TError,
        {
            ids: Identifier[];
        }
    >(({ ids }: { ids: Identifier[] }) => deleteMany<TData>(resource, ids), {
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(queryResource);
        },
        onSuccess: (_data, id) => {
            notification.success({
                key: `${id}-${resource}-notification`,
                message: translate("common:notifications.success", "Success"),
                description: translate(
                    "common:notifications.deleteSuccess",
                    { resource },
                    `Successfully deleted ${resource}`,
                ),
            });
        },
        onError: (err: TError, id) => {
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
    });

    return mutation;
};
