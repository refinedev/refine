import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { useAuthBindingsContext } from "@contexts/auth";
import { useKeys, useNotification } from "@hooks";

import type {
  AuthActionResponse,
  SuccessNotificationResponse,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";

export type UseForgotPasswordProps<TVariables> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseForgotPasswordReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
> & {
  isLoading: boolean;
};

/**
 * `useForgotPassword` calls `forgotPassword` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useForgotPassword} for more details.
 *
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useForgotPassword<TVariables = {}>({
  mutationOptions,
}: UseForgotPasswordProps<TVariables> = {}): UseForgotPasswordReturnType<TVariables> {
  const { open } = useNotification();
  const { forgotPassword: forgotPasswordFromContext } =
    useAuthBindingsContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("forgotPassword").get(),
    mutationFn: forgotPasswordFromContext,
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useForgotPassword"),
    },
  });

  // Handle success with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      const { success, error, successNotification } = mutation.data;

      if (success) {
        if (successNotification) {
          open?.(buildSuccessNotification(successNotification));
        }
      }

      if (error || !success) {
        open?.(buildNotification(error));
      }
    }
  }, [mutation.isSuccess, mutation.data]);

  // Handle error with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isError && mutation.error) {
      open?.(buildNotification(mutation.error));
    }
  }, [mutation.isError, mutation.error]);

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
}

const buildNotification = (
  error?: Error | RefineError,
): OpenNotificationParams => {
  return {
    message: error?.name || "Forgot Password Error",
    description: error?.message || "Error while resetting password",
    key: "forgot-password-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "forgot-password-success",
    type: "success",
  };
};
