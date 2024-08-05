import type {
  MutateOptions,
  UseMutationResult as UseMutationResultBase,
} from "@tanstack/react-query";

export type MutateAsyncFunction<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = (
  variables?: TVariables,
  options?: MutateOptions<TData, TError, TVariables, TContext>,
) => Promise<TData>;

export type MutateFunction<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = (
  ...args: Parameters<MutateAsyncFunction<TData, TError, TVariables, TContext>>
) => void;

/**
 * we want to make the mutate and mutateAsync functions optional in the UseMutationResult
 * because we want users to be able to provide the required parameters from the hook
 */
export type UseMutationResult<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
> = Omit<
  UseMutationResultBase<TData, TError, TVariables, TContext>,
  "mutate" | "mutateAsync"
> & {
  mutate: MutateFunction<TData, TError, TVariables, TContext>;
  mutateAsync: MutateAsyncFunction<TData, TError, TVariables, TContext>;
};
