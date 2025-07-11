import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { useAuthBindingsContext } from "@contexts/auth";
import {
  useGo,
  useKeys,
  useNavigation,
  useNotification,
  useRouterType,
} from "@hooks";

import type {
  AuthActionResponse,
  SuccessNotificationResponse,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

export type UseRegisterProps<TVariables> = {
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

export type UseRegisterReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
> & {
  isLoading: boolean;
};

/**
 * `useRegister` calls `register` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useRegister} for more details.
 *
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useRegister<TVariables = {}>({
  mutationOptions,
}: UseRegisterProps<TVariables> = {}): UseRegisterReturnType<TVariables> {
  const invalidateAuthStore = useInvalidateAuthStore();
  const routerType = useRouterType();
  const go = useGo();
  const { push } = useNavigation();
  const { close, open } = useNotification();
  const { register: registerFromContext } = useAuthBindingsContext();
  const { keys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("register").get(),
    mutationFn: registerFromContext,
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useRegister"),
    },
  });

  // Handle success with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      const { success, redirectTo, error, successNotification } = mutation.data;

      if (success) {
        close?.("register-error");

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

      invalidateAuthStore();
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
    message: error?.name || "Register Error",
    description: error?.message || "Error while registering",
    key: "register-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "register-success",
    type: "success",
  };
};
