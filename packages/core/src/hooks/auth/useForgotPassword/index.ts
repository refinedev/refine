import { getXRay } from "@refinedev/devtools-internal";
import {
  UseMutationOptions,
  UseMutationResult,
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

import {
  AuthActionResponse,
  SuccessNotificationResponse,
  TForgotPasswordData,
} from "../../../contexts/auth/types";
import { RefineError } from "../../../contexts/data/types";
import { OpenNotificationParams } from "../../../contexts/notification/types";

export type UseForgotPasswordLegacyProps<TVariables> = {
  v3LegacyAuthProviderCompatible: true;
  mutationOptions?: Omit<
    UseMutationOptions<
      TForgotPasswordData,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn" | "onError" | "onSuccess"
  >;
};

export type UseForgotPasswordProps<TVariables> = {
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

export type UseForgotPasswordCombinedProps<TVariables> = {
  v3LegacyAuthProviderCompatible: boolean;
  mutationOptions?: Omit<
    UseMutationOptions<
      AuthActionResponse | TForgotPasswordData,
      Error | RefineError,
      TVariables,
      unknown
    >,
    "mutationFn"
  >;
};

export type UseForgotPasswordLegacyReturnType<TVariables> = UseMutationResult<
  TForgotPasswordData,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseForgotPasswordReturnType<TVariables> = UseMutationResult<
  AuthActionResponse,
  Error | RefineError,
  TVariables,
  unknown
>;

export type UseForgotPasswordCombinedReturnType<TVariables> = UseMutationResult<
  AuthActionResponse | TForgotPasswordData,
  Error | RefineError,
  TVariables,
  unknown
>;

export function useForgotPassword<TVariables = {}>(
  props: UseForgotPasswordLegacyProps<TVariables>,
): UseForgotPasswordLegacyReturnType<TVariables>;

export function useForgotPassword<TVariables = {}>(
  props?: UseForgotPasswordProps<TVariables>,
): UseForgotPasswordReturnType<TVariables>;

export function useForgotPassword<TVariables = {}>(
  props?: UseForgotPasswordCombinedProps<TVariables>,
): UseForgotPasswordCombinedReturnType<TVariables>;

/**
 * `useForgotPassword` calls `forgotPassword` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useForgotPassword} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useForgotPassword<TVariables = {}>({
  v3LegacyAuthProviderCompatible,
  mutationOptions,
}:
  | UseForgotPasswordProps<TVariables>
  | UseForgotPasswordLegacyProps<TVariables> = {}):
  | UseForgotPasswordReturnType<TVariables>
  | UseForgotPasswordLegacyReturnType<TVariables> {
  const routerType = useRouterType();
  const go = useGo();
  const { replace } = useNavigation();
  const {
    forgotPassword: v3LegacyAuthProviderCompatibleForgotPasswordFromContext,
  } = useLegacyAuthContext();
  const { forgotPassword: forgotPasswordFromContext } =
    useAuthBindingsContext();
  const { close, open } = useNotification();
  const { keys, preferLegacyKeys } = useKeys();

  const mutation = useMutation<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: keys().auth().action("forgotPassword").get(preferLegacyKeys),
    mutationFn: forgotPasswordFromContext,
    onSuccess: ({ success, redirectTo, error, successNotification }) => {
      if (success) {
        close?.("forgot-password-error");

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
      ...getXRay("useForgotPassword", preferLegacyKeys),
    },
  });

  const v3LegacyAuthProviderCompatibleMutation = useMutation<
    TForgotPasswordData,
    Error | RefineError,
    TVariables,
    unknown
  >({
    mutationKey: [
      ...keys().auth().action("forgotPassword").get(preferLegacyKeys),
      "v3LegacyAuthProviderCompatible",
    ],
    mutationFn: v3LegacyAuthProviderCompatibleForgotPasswordFromContext,
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
      close?.("forgot-password-error");
    },
    onError: (error: any) => {
      open?.(buildNotification(error));
    },
    ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
    meta: {
      ...(v3LegacyAuthProviderCompatible ? mutationOptions?.meta : {}),
      ...getXRay("useForgotPassword", preferLegacyKeys),
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
