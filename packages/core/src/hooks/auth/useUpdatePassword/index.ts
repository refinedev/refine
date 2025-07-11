import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { useAuthBindingsContext } from "@contexts/auth";
import {
  useKeys,
  useNotification,
  useRouterType,
  useGo,
  useNavigation,
} from "@hooks";

import type {
  AuthActionResponse,
  SuccessNotificationResponse,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";

export type UseUpdatePasswordProps<TVariables> = {
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

export type UseUpdatePasswordReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
> & {
  isLoading: boolean;
};

/**
 * `useUpdatePassword` calls `updatePassword` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useUpdatePassword} for more details.
 *
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useUpdatePassword<TVariables = {}>({
  mutationOptions,
}: UseUpdatePasswordProps<TVariables> = {}): UseUpdatePasswordReturnType<TVariables> {
  const routerType = useRouterType();
  const go = useGo();
  const { push } = useNavigation();
  const { open } = useNotification();
  const { updatePassword: updatePasswordFromContext } =
    useAuthBindingsContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("updatePassword").get(),
    mutationFn: updatePasswordFromContext,
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useUpdatePassword"),
    },
  });

  // Handle success with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      const { success, redirectTo, error, successNotification } = mutation.data;

      if (success) {
        if (successNotification) {
          open?.(buildSuccessNotification(successNotification));
        }
      }

      if (error || !success) {
        open?.(buildNotification(error));
      }

      if (redirectTo && success) {
        if (routerType === "legacy") {
          push(redirectTo);
        } else {
          go({ to: redirectTo, type: "push" });
        }
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
    message: error?.name || "Update Password Error",
    description: error?.message || "Error while updating password",
    key: "update-password-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "update-password-success",
    type: "success",
  };
};
