import { useContext } from "react";

import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { ResourceContext } from "@contexts/resource";
import { hasPermission, pickNotDeprecated } from "@definitions/helpers";
import { useActiveAuthProvider } from "@definitions/helpers";
import { pickResource } from "@definitions/helpers/pick-resource";
import { useGetIdentity } from "@hooks/auth";
import { useKeys } from "@hooks/useKeys";

import type { LogParams } from "../../../contexts/auditLog/types";
import type { BaseKey } from "../../../contexts/data/types";

type LogRenameData =
  | {
      resource?: string;
    }
  | undefined;

export type UseLogReturnType<TLogData, TLogRenameData> = {
  log: UseMutationResult<TLogData, Error, LogParams>;
  rename: UseMutationResult<
    TLogRenameData,
    Error,
    {
      id: BaseKey;
      name: string;
    }
  >;
};

export type UseLogMutationProps<
  TLogData,
  TLogRenameData extends LogRenameData = LogRenameData,
> = {
  logMutationOptions?: Omit<
    UseMutationOptions<TLogData, Error, LogParams, unknown>,
    "mutationFn"
  >;
  renameMutationOptions?: Omit<
    UseMutationOptions<
      TLogRenameData,
      Error,
      { id: BaseKey; name: string },
      unknown
    >,
    "mutationFn" | "onSuccess"
  >;
};

/**
 * useLog is used to `create` a new and `rename` the existing audit log.
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/audit-log/useLog} for more details.
 */

export const useLog = <
  TLogData,
  TLogRenameData extends LogRenameData = LogRenameData,
>({
  logMutationOptions,
  renameMutationOptions,
}: UseLogMutationProps<TLogData, TLogRenameData> = {}): UseLogReturnType<
  TLogData,
  TLogRenameData
> => {
  const queryClient = useQueryClient();
  const auditLogContext = useContext(AuditLogContext);
  const { keys, preferLegacyKeys } = useKeys();

  const authProvider = useActiveAuthProvider();

  const { resources } = useContext(ResourceContext);
  const {
    data: identityData,
    refetch,
    isLoading,
  } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    queryOptions: {
      enabled: !!auditLogContext?.create,
    },
  });

  const log = useMutation<TLogData, Error, LogParams, unknown>(
    async (params) => {
      const resource = pickResource(params.resource, resources);
      const logPermissions = pickNotDeprecated(
        resource?.meta?.audit,
        resource?.options?.audit,
        resource?.options?.auditLog?.permissions,
      );

      if (logPermissions) {
        if (!hasPermission(logPermissions, params.action)) {
          return;
        }
      }

      let authorData;
      if (isLoading && !!auditLogContext?.create) {
        authorData = await refetch();
      }

      return await auditLogContext.create?.({
        ...params,
        author: identityData ?? authorData?.data,
      });
    },
    {
      mutationKey: keys().audit().action("log").get(),
      ...logMutationOptions,
      meta: {
        ...logMutationOptions?.meta,
        ...getXRay("useLog", preferLegacyKeys),
      },
    },
  );

  const rename = useMutation<
    TLogRenameData,
    Error,
    { id: BaseKey; name: string },
    unknown
  >(
    async (params) => {
      return await auditLogContext.update?.(params);
    },
    {
      onSuccess: (data) => {
        if (data?.resource) {
          queryClient.invalidateQueries(
            keys()
              .audit()
              .resource(data?.resource ?? "")
              .action("list")
              .get(preferLegacyKeys),
          );
        }
      },
      mutationKey: keys().audit().action("rename").get(),
      ...renameMutationOptions,
      meta: {
        ...renameMutationOptions?.meta,
        ...getXRay("useLog", preferLegacyKeys),
      },
    },
  );

  return { log, rename };
};
