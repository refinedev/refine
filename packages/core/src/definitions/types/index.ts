import type { UseMutationResult as UseMutationResultBase } from "@tanstack/react-query";

export type Override<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
};

// Type to make array elements optional
export type PartialArray<T extends unknown[]> = {
  [K in keyof T]?: T[K];
};

// Type to make function arguments optional
export type MakeFunctionArgsOptional<T> = T extends (
  ...args: infer P
) => infer R
  ? (...args: PartialArray<P>) => R
  : never;

/**
 * we want to make the mutate and mutateAsync functions optional in the UseMutationResult
 * because we want users to be able to provide the required parameters from the hook
 */
export type UseMutationResult<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
> = Override<
  UseMutationResultBase<TData, TError, TVariables, TContext>,
  {
    mutate: MakeFunctionArgsOptional<
      UseMutationResultBase<TData, TError, TVariables, TContext>["mutate"]
    >;
    mutateAsync: MakeFunctionArgsOptional<
      UseMutationResultBase<TData, TError, TVariables, TContext>["mutateAsync"]
    >;
  }
>;
