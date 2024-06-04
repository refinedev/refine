import React from "react";

import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import qs from "qs";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
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
  TLoginData,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

export type UseLoginLegacyProps<TVariables> = {
  v3LegacyAuthProviderCompatible: true;
  mutationOptions?: Omit<
    UseMutationOptions<TLoginData, Error | RefineError, TVariables, unknown>,
    "mutationFn" | "onError" | "onSuccess"
  >;
};

export type UseLoginProps<TVariables> = {
  v3LegacyAuthProviderCompatible?: false;
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

export type UseLoginCombinedProps<TVariables> = {
  v3LegacyAuthProviderCompatible: boolean;
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse | TLoginData,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseLoginLegacyReturnType<TVariables> = UseMutationResult<
  TLoginData,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseLoginReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseLoginCombinedReturnType<TVariables> = UseMutationResult<
  AuthActionResponse | TLoginData,
  Error | RefineError,
  TVariables,
  unknown
>;

export function useLogin<TVariables = {}>(
  props: UseLoginLegacyProps<TVariables>,
): UseLoginLegacyReturnType<TVariables>;

export function useLogin<TVariables = {}>(
  props?: UseLoginProps<TVariables>,
): UseLoginReturnType<TVariables>;

export function useLogin<TVariables = {}>(
  props?: UseLoginCombinedProps<TVariables>,
): UseLoginCombinedReturnType<TVariables>;

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
  v3LegacyAuthProviderCompatible,
  mutationOptions,
}: UseLoginProps<TVariables> | UseLoginLegacyProps<TVariables> = {}):
  | UseLoginLegacyReturnType<TVariables>
  | UseLoginReturnType<TVariables> {
  const invalidateAuthStore = useInvalidateAuthStore();
  const routerType = useRouterType();

  const go = useGo();
  const { replace } = useNavigation();

  const parsed = useParsed();

  const { useLocation } = useRouterContext();
  const { search } = useLocation();

  const { close, open } = useNotification();
  const { login: legacyLoginFromContext } = useLegacyAuthContext();
  const { login: loginFromContext } = useAuthBindingsContext();
  const { keys, preferLegacyKeys } = useKeys();

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
    mutationKey: keys().auth().action("login").get(preferLegacyKeys),
    mutationFn: loginFromContext,
    onSuccess: async ({ success, redirectTo, error, successNotification }) => {
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

      await invalidateAuthStore();
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
    meta: {
      ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions?.meta),
      ...getXRay("useLogin", preferLegacyKeys),
    },
  });

  const v3LegacyAuthProviderCompatibleMutation = useMutation<
    TLoginData,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: [
      ...keys().auth().action("login").get(preferLegacyKeys),
      "v3LegacyAuthProviderCompatible",
    ],
    mutationFn: legacyLoginFromContext,
    onSuccess: async (redirectPathFromAuth) => {
      if (to) {
        replace(to as string);
      }

      if (redirectPathFromAuth !== false && !to) {
        if (typeof redirectPathFromAuth === "string") {
          if (routerType === "legacy") {
            replace(redirectPathFromAuth);
          } else {
            go({ to: redirectPathFromAuth, type: "replace" });
          }
        } else {
          if (routerType === "legacy") {
            replace("/");
          } else {
            go({ to: "/", type: "replace" });
          }
        }
      }

      await invalidateAuthStore();

      close?.("login-error");
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
    meta: {
      ...(v3LegacyAuthProviderCompatible ? mutationOptions?.meta : {}),
      ...getXRay("useLogin", preferLegacyKeys),
    },
  });

  return v3LegacyAuthProviderCompatible
    ? v3LegacyAuthProviderCompatibleMutation
    : mutation;
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
