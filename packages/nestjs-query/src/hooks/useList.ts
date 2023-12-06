import {
    BaseRecord,
    GetListResponse,
    HttpError,
    LiveModeProps,
    Prettify,
    SuccessErrorNotification,
    UseLoadingOvertimeOptionsProps,
    useList as useListCore,
} from "@refinedev/core";
import { BaseListProps } from "@refinedev/core/dist/hooks/data/useList";

export type UseListProps<TQueryFnData, TError, TData> = {
    /**
     * Resource name for API data interactions
     */
    resource?: string;

    /**
     * Tanstack Query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
    queryOptions?: any;
} & BaseListProps &
    SuccessErrorNotification<
        GetListResponse<TData>,
        TError,
        Prettify<BaseListProps>
    > &
    LiveModeProps &
    UseLoadingOvertimeOptionsProps;

type Extract<Q extends Record<string, { nodes: any[] }>> =
    Q[keyof Q]["nodes"][0];

export const useList = <
    TQueryFnData extends Record<string, { nodes: BaseRecord[] }>,
    TError extends HttpError = HttpError,
>(
    params: UseListProps<Extract<TQueryFnData>, TError, Extract<TQueryFnData>>,
) => {
    return useListCore<Extract<TQueryFnData>, TError, Extract<TQueryFnData>>(
        params,
    );
};
