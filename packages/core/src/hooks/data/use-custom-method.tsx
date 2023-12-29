import React from "react";
import { useDataProvider } from "./useDataProvider";
import {
    CustomMethodDefinitions,
    CustomMethodResponse,
    HttpError,
    IDataContextProvider,
    MetaQuery,
} from "src/interfaces";
import {
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useMeta } from "..";

type QueryProps<
    TData = any,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    as?: "query";
    dataProviderName?: string;
    params?: TVariables;
    meta?: MetaQuery;
    queryOptions?: Omit<
        UseQueryOptions<
            CustomMethodResponse<TData>,
            TError,
            CustomMethodResponse<TData>
        >,
        "queryFn"
    >;
};

type MutationVariables<TVariables = {}> = {
    params?: TVariables;
    meta?: MetaQuery;
};

type MutationProps<
    TData = any,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    as: "mutation";
    dataProviderName?: string;
    mutationOptions?: Omit<
        UseMutationOptions<
            CustomMethodResponse<TData>,
            TError,
            MutationVariables<TVariables>
        >,
        "mutationFn"
    >;
};

type QueryReturnType<
    TData = any,
    TError extends HttpError = HttpError,
> = UseQueryResult<CustomMethodResponse<TData>, TError>;

type MutationReturnType<
    TData = any,
    TVariables = {},
    TError extends HttpError = HttpError,
> = UseMutationResult<
    CustomMethodResponse<TData>,
    TError,
    MutationVariables<TVariables>
>;

type ForbiddenMethodNames = Exclude<
    keyof Required<IDataContextProvider>,
    "customMethods"
>;

export function useCustomMethod<
    TData = any,
    TError extends HttpError = HttpError,
    TVariables = {},
    TMethodName extends string = string,
>(
    methodName: TMethodName extends ForbiddenMethodNames ? never : TMethodName,
    props?: QueryProps<TData, TError, TVariables>,
): QueryReturnType<TData, TError>;
export function useCustomMethod<
    TData = any,
    TError extends HttpError = HttpError,
    TVariables = {},
    TMethodName extends string = string,
>(
    methodName: TMethodName extends ForbiddenMethodNames ? never : TMethodName,
    props: MutationProps<TData, TError, TVariables>,
): MutationReturnType<TData, TVariables, TError>;
export function useCustomMethod<
    TData = any,
    TError extends HttpError = HttpError,
    TVariables = {},
    TMethodName extends string = string,
>(
    methodName: TMethodName extends ForbiddenMethodNames ? never : TMethodName,
    {
        dataProviderName,
        as,
        ...props
    }:
        | QueryProps<TData, TError, TVariables>
        | MutationProps<TData, TError, TVariables> = {
        dataProviderName: "default",
        as: "query",
    },
) {
    const dataProvider = useDataProvider();
    const combineMeta = useMeta();

    const method = React.useMemo(
        () =>
            dataProvider(dataProviderName).customMethods?.[methodName] ??
            fallbackMethod(methodName, dataProviderName),
        [dataProvider, dataProviderName, methodName],
    );

    const queryResult = useQuery<CustomMethodResponse<TData>, TError>({
        queryFn: () =>
            method<TData, TVariables>({
                params: "params" in props ? props.params : undefined,
                meta: combineMeta({
                    meta: "meta" in props ? props.meta : undefined,
                }),
            }),
        queryKey: [
            dataProviderName,
            "data",
            methodName,
            "query",
            {
                params: "params" in props ? props.params : undefined,
                meta: "meta" in props ? props.meta : undefined,
            },
        ],
        enabled: as !== "mutation",
        ...("queryOptions" in props ? props.queryOptions : {}),
    });

    const mutationResult = useMutation<
        CustomMethodResponse<TData>,
        TError,
        MutationVariables<TVariables>
    >({
        mutationFn: ({ params, meta }) =>
            method<TData, TVariables>({
                params: params,
                meta: combineMeta({ meta }),
            }),
        mutationKey: [dataProviderName, "data", methodName, "mutation"],
        ...("mutationOptions" in props ? props.mutationOptions : {}),
    });

    if (as === "mutation") {
        return mutationResult;
    }

    return queryResult;
}

const fallbackMethod: (
    name: string,
    dataProvider?: string,
) => CustomMethodDefinitions["fallback"] =
    (name: string, dataProvider = "default") =>
    async () => {
        throw new Error(
            `Method "${name}" is not found in dataProvider "${dataProvider}"`,
        );
    };
