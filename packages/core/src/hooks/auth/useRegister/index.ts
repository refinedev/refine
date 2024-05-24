import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
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
  TLoginData,
  TRegisterData,
} from "../../../contexts/auth/types";
import type { RefineError } from "../../../contexts/data/types";
import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

export type UseRegisterLegacyProps<TVariables> = {
  v3LegacyAuthProviderCompatible: true;
  mutationOptions?: Omit<
    UseMutationOptions<TRegisterData, Error | RefineError, TVariables, unknown>,
    "mutationFn" | "onError" | "onSuccess"
  >;
};

export type UseRegisterProps<TVariables> = {
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

export type UseRegisterCombinedProps<TVariables> = {
  v3LegacyAuthProviderCompatible: boolean;
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse | TRegisterData,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseRegisterLegacyReturnType<TVariables> = UseMutationResult<
  TRegisterData,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseRegisterReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseRegisterCombinedReturnType<TVariables> = UseMutationResult<
  AuthActionResponse | TLoginData,
  Error | RefineError,
  TVariables,
  unknown
>;

export function useRegister<TVariables = {}>(
  props: UseRegisterLegacyProps<TVariables>,
): UseRegisterLegacyReturnType<TVariables>;

export function useRegister<TVariables = {}>(
  props?: UseRegisterProps<TVariables>,
): UseRegisterReturnType<TVariables>;

export function useRegister<TVariables = {}>(
  props?: UseRegisterCombinedProps<TVariables>,
): UseRegisterCombinedReturnType<TVariables>;

/**
 * `useRegister` calls `register` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useRegister} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useRegister<TVariables = {}>({
  v3LegacyAuthProviderCompatible,
  mutationOptions,
}: UseRegisterProps<TVariables> | UseRegisterLegacyProps<TVariables> = {}):
  | UseRegisterReturnType<TVariables>
  | UseRegisterLegacyReturnType<TVariables> {
  const invalidateAuthStore = useInvalidateAuthStore();
  const routerType = useRouterType();
  const go = useGo();
  const { replace } = useNavigation();
  const { register: legacyRegisterFromContext } = useLegacyAuthContext();
  const { register: registerFromContext } = useAuthBindingsContext();
  const { close, open } = useNotification();

  const { keys, preferLegacyKeys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("register").get(preferLegacyKeys),
    mutationFn: registerFromContext,
    onSuccess: async ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("register-error");

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
      ...getXRay("useRegister", preferLegacyKeys),
    },
  });

  const v3LegacyAuthProviderCompatibleMutation = useMutation<
    TRegisterData,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: [
      ...keys().auth().action("register").get(preferLegacyKeys),
      "v3LegacyAuthProviderCompatible",
    ],
    mutationFn: legacyRegisterFromContext,
    onSuccess: async (redirectPathFromAuth) => {
      if (redirectPathFromAuth !== false) {
        if (redirectPathFromAuth) {
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

        await invalidateAuthStore();

        close?.("register-error");
      }
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
    meta: {
      ...(v3LegacyAuthProviderCompatible ? mutationOptions?.meta : {}),
      ...getXRay("useRegister", preferLegacyKeys),
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
