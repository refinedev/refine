import React from "react";

import { getXRay } from "@refinedev/devtools-internal";
import {
  UseMutationOptions,
  UseMutationResult,
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

import { UpdatePasswordFormTypes } from "../../../components/pages/auth/types";
import {
  AuthActionResponse,
  SuccessNotificationResponse,
  TUpdatePasswordData,
} from "../../../contexts/auth/types";
import { RefineError } from "../../../contexts/data/types";
import { OpenNotificationParams } from "../../../contexts/notification/types";

export type UseUpdatePasswordLegacyProps<
  TVariables extends UpdatePasswordFormTypes,
> = {
  v3LegacyAuthProviderCompatible: true;
  mutationOptions?: Omit<
    UseMutationOptions<
      TUpdatePasswordData,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn" | "onError" | "onSuccess"
  >;
};

export type UseUpdatePasswordProps<TVariables extends UpdatePasswordFormTypes> =
  {
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

export type UseUpdatePasswordCombinedProps<
  TVariables extends UpdatePasswordFormTypes,
> = {
  v3LegacyAuthProviderCompatible: boolean;
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse | TUpdatePasswordData,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseUpdatePasswordLegacyReturnType<
  TVariables extends UpdatePasswordFormTypes,
> = UseMutationResult<
  TUpdatePasswordData,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseUpdatePasswordReturnType<
  TVariables extends UpdatePasswordFormTypes,
> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseUpdatePasswordCombinedReturnType<
  TVariables extends UpdatePasswordFormTypes,
> = UseMutationResult<
  AuthActionResponse | TUpdatePasswordData,
  Error | RefineError,
  TVariables,
  unknown
>;

export function useUpdatePassword<TVariables extends UpdatePasswordFormTypes>(
  props: UseUpdatePasswordLegacyProps<TVariables>,
): UseUpdatePasswordLegacyReturnType<TVariables>;

export function useUpdatePassword<TVariables extends UpdatePasswordFormTypes>(
  props?: UseUpdatePasswordProps<TVariables>,
): UseUpdatePasswordReturnType<TVariables>;

export function useUpdatePassword<TVariables extends UpdatePasswordFormTypes>(
  props?: UseUpdatePasswordCombinedProps<TVariables>,
): UseUpdatePasswordCombinedReturnType<TVariables>;

/**
 * `useUpdatePassword` calls `updatePassword` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useUpdatePassword} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useUpdatePassword<
  TVariables extends UpdatePasswordFormTypes = {},
>({
  v3LegacyAuthProviderCompatible,
  mutationOptions,
}:
  | UseUpdatePasswordProps<TVariables>
  | UseUpdatePasswordLegacyProps<TVariables> = {}):
  | UseUpdatePasswordReturnType<TVariables>
  | UseUpdatePasswordLegacyReturnType<TVariables> {
  const routerType = useRouterType();

  const go = useGo();
  const { replace } = useNavigation();
  const { updatePassword: legacyUpdatePasswordFromContext } =
    useLegacyAuthContext();
  const { updatePassword: updatePasswordFromContext } =
    useAuthBindingsContext();
  const { close, open } = useNotification();

  const { keys, preferLegacyKeys } = useKeys();

  const parsed = useParsed();
  const { useLocation } = useRouterContext();
  const { search } = useLocation();

  const params = React.useMemo(() => {
    if (routerType === "legacy") {
      const queryStrings = qs.parse(search, {
        ignoreQueryPrefix: true,
      });
      return queryStrings ?? {};
    }
    return parsed.params ?? {};
  }, [search, parsed, routerType]);

  const mutation = useMutation<AuthActionResponse, Error, TVariables, unknown>({
    mutationKey: keys().auth().action("updatePassword").get(preferLegacyKeys),
    mutationFn: async (variables) => {
      return updatePasswordFromContext?.({
        ...params,
        ...variables,
      }) as Promise<AuthActionResponse>;
    },
    onSuccess: ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("update-password-error");

        if (successNotification) {
          open?.(buildSuccessNotification(successNotification));
        }
      }

      if (error || !success) {
        open?.(buildNotification(error));
      }

      if (redirectTo) {
        if (routerType === "legacy") {
          replace(redirectTo);
        } else {
          go({ to: redirectTo, type: "replace" });
        }
      }
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
    meta: {
      ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions?.meta),
      ...getXRay("useUpdatePassword", preferLegacyKeys),
    },
  });

  const v3LegacyAuthProviderCompatibleMutation = useMutation<
    TUpdatePasswordData,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: [
      ...keys().auth().action("updatePassword").get(preferLegacyKeys),
      "v3LegacyAuthProviderCompatible",
    ],
    mutationFn: async (variables) => {
      return legacyUpdatePasswordFromContext?.({
        ...params,
        ...variables,
      });
    },
    onSuccess: (redirectPathFromAuth) => {
      if (redirectPathFromAuth !== false) {
        if (redirectPathFromAuth) {
          if (routerType === "legacy") {
            replace(redirectPathFromAuth);
          } else {
            go({ to: redirectPathFromAuth, type: "replace" });
          }
        }
      }
      close?.("update-password-error");
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
    meta: {
      ...(v3LegacyAuthProviderCompatible ? mutationOptions?.meta : {}),
      ...getXRay("useUpdatePassword", preferLegacyKeys),
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
