import React, { useEffect } from "react";

import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import qs from "qs";

import { useAuthBindingsContext } from "@contexts/auth";
import {
  useGo,
  useKeys,
  useNavigation,
  useNotification,
  useParsed,
  useRouterContext,
  useRouterType,
} from "@hooks";

import type {
  AuthActionResponse,
  SuccessNotificationResponse,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

export type UseLoginProps<TVariables> = {
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

export type UseLoginReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
> & {
  isLoading: boolean;
};

/**
 * `useLogin` calls `login` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useLogin} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useLogin<TVariables = {}>({
  mutationOptions,
}: UseLoginProps<TVariables> = {}): UseLoginReturnType<TVariables> {
  const invalidateAuthStore = useInvalidateAuthStore();
  const routerType = useRouterType();

  const go = useGo();
  const { replace } = useNavigation();

  const parsed = useParsed();

  const { useLocation } = useRouterContext();
  const { search } = useLocation();

  const { close, open } = useNotification();
  const { login: loginFromContext } = useAuthBindingsContext();
  const { keys } = useKeys();

  const to = React.useMemo(() => {
    if (routerType === "legacy") {
      const legacySearch = qs.parse(search, {
        ignoreQueryPrefix: true,
      });
      return legacySearch.to;
    }
    return parsed.params?.to;
  }, [routerType, parsed.params, search]);

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("login").get(),
    mutationFn: loginFromContext,
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useLogin"),
    },
  });

  // Handle success with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      const { success, redirectTo, error, successNotification } = mutation.data;

      if (success) {
        close?.("login-error");

        if (successNotification) {
          open?.(buildSuccessNotification(successNotification));
        }
      }

      if (error || !success) {
        open?.(buildNotification(error));
      }

      if (to && success) {
        if (routerType === "legacy") {
          replace(to as string);
        } else {
          go({ to: to as string, type: "replace" });
        }
      } else if (redirectTo) {
        if (routerType === "legacy") {
          replace(redirectTo);
        } else {
          go({ to: redirectTo, type: "replace" });
        }
      } else {
        if (routerType === "legacy") {
          replace("/");
        }
      }

      setTimeout(() => {
        invalidateAuthStore();
      }, 32);
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
    message: error?.name || "Login Error",
    description: error?.message || "Invalid credentials",
    key: "login-error",
    type: "error",
  };
};

const buildSuccessNotification = (
  successNotification: SuccessNotificationResponse,
): OpenNotificationParams => {
  return {
    message: successNotification.message,
    description: successNotification.description,
    key: "login-success",
    type: "success",
  };
};
