"use client";

import * as React from "react";
import { useOne, useMany } from "@refinedev/core";
import type { BaseRecord } from "@refinedev/core";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { cn } from "@/lib/utils";

// --- Registry (external store, one per provider tree) ---

type RelationResourceEntry = {
  data: BaseRecord[];
  isLoading: boolean;
  isError: boolean;
};

type RelationRegistry = {
  register: (resource: string, entry: RelationResourceEntry) => void;
  unregister: (resource: string) => void;
  get: (resource: string) => RelationResourceEntry | undefined;
  subscribe: (listener: () => void) => () => void;
};

function createRelationRegistry(): RelationRegistry {
  const entries = new Map<string, RelationResourceEntry>();
  const listeners = new Set<() => void>();

  function notify() {
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    register(resource, entry) {
      const existing = entries.get(resource);
      if (
        existing &&
        existing.data === entry.data &&
        existing.isLoading === entry.isLoading &&
        existing.isError === entry.isError
      ) {
        return;
      }
      entries.set(resource, entry);
      // Notify after the current render completes to avoid
      // "cannot update component while rendering" errors.
      // This ensures memoized consumers still pick up changes.
      queueMicrotask(notify);
    },
    unregister(resource) {
      if (entries.has(resource)) {
        entries.delete(resource);
        notify();
      }
    },
    get(resource) {
      return entries.get(resource);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

const RelationRegistryContext = React.createContext<RelationRegistry | null>(
  null,
);

// --- Provider ---

export function DataTableCellRelationProvider({
  resource,
  ids,
  meta,
  children,
}: {
  resource: string;
  ids: (string | number)[];
  meta?: Record<string, unknown>;
  children: React.ReactNode;
}) {
  const parentRegistry = React.useContext(RelationRegistryContext);
  const ownRegistryRef = React.useRef<RelationRegistry | null>(null);

  // Create a registry only if there isn't one from a parent provider
  if (!parentRegistry && !ownRegistryRef.current) {
    ownRegistryRef.current = createRelationRegistry();
  }

  const registry = parentRegistry ?? ownRegistryRef.current!;

  const uniqueIds = React.useMemo(() => [...new Set(ids)], [ids]);

  const { result, query } = useMany({
    resource,
    ids: uniqueIds,
    meta,
    queryOptions: {
      enabled: uniqueIds.length > 0,
    },
  });

  // Register synchronously during render so data is available before children mount.
  // The equality check inside register() prevents redundant notifications.
  registry.register(resource, {
    data: result?.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  });

  // Unregister on unmount
  React.useEffect(() => {
    return () => {
      registry.unregister(resource);
    };
  }, [registry, resource]);

  // Only provide context if we created the registry (first provider in tree)
  if (!parentRegistry) {
    return (
      <RelationRegistryContext.Provider value={registry}>
        {children}
      </RelationRegistryContext.Provider>
    );
  }

  return <>{children}</>;
}

// --- Hook: subscribe to a specific resource in the registry ---

const noopUnsubscribe = () => {};

function useRelationEntry(resource: string) {
  const registry = React.useContext(RelationRegistryContext);

  const subscribe = React.useCallback(
    (cb: () => void) => {
      if (!registry) return noopUnsubscribe;
      return registry.subscribe(cb);
    },
    [registry],
  );

  const getSnapshot = React.useCallback(() => {
    return registry?.get(resource);
  }, [registry, resource]);

  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// --- Cell ---

type DataTableCellRelationChildrenProps = {
  data: BaseRecord | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function DataTableCellRelation({
  resource,
  id,
  field = "title",
  meta,
  className,
  children,
}: {
  resource: string;
  id: string | number;
  field?: string;
  meta?: Record<string, unknown>;
  className?: string;
  children?: (props: DataTableCellRelationChildrenProps) => React.ReactNode;
}) {
  const entry = useRelationEntry(resource);

  // Provider exists for this resource
  if (entry) {
    if (entry.isLoading) {
      if (children) {
        return children({ data: undefined, isLoading: true, isError: false });
      }
      return <Skeleton className="h-4 w-20" />;
    }

    // Provider errored — fall back to useOne
    if (entry.isError) {
      return (
        <DataTableCellRelationFallback
          resource={resource}
          id={id}
          field={field}
          meta={meta}
          className={className}
        >
          {children}
        </DataTableCellRelationFallback>
      );
    }

    const record = entry.data.find((item) => String(item.id) === String(id));

    // ID not found in provider data — fall back to useOne
    if (!record) {
      return (
        <DataTableCellRelationFallback
          resource={resource}
          id={id}
          field={field}
          meta={meta}
          className={className}
        >
          {children}
        </DataTableCellRelationFallback>
      );
    }

    if (children) {
      return children({ data: record, isLoading: false, isError: false });
    }

    return (
      <span className={className}>
        {String((record as Record<string, unknown>)[field] ?? id)}
      </span>
    );
  }

  // No provider for this resource — fall back to useOne
  return (
    <DataTableCellRelationFallback
      resource={resource}
      id={id}
      field={field}
      meta={meta}
      className={className}
    >
      {children}
    </DataTableCellRelationFallback>
  );
}

function DataTableCellRelationFallback({
  resource,
  id,
  field = "title",
  meta,
  className,
  children,
}: {
  resource: string;
  id: string | number;
  field?: string;
  meta?: Record<string, unknown>;
  className?: string;
  children?: (props: DataTableCellRelationChildrenProps) => React.ReactNode;
}) {
  const { result, query } = useOne({
    resource,
    id,
    meta,
    queryOptions: {
      enabled: id != null,
    },
  });

  if (children) {
    return children({
      data: result as BaseRecord | undefined,
      isLoading: query.isLoading,
      isError: query.isError,
    });
  }

  if (query.isLoading) {
    return <Skeleton className="h-4 w-20" />;
  }

  if (query.isError || !result) {
    return (
      <span className={cn("text-muted-foreground", className)}>
        {String(id)}
      </span>
    );
  }

  const record = result as Record<string, unknown>;

  return <span className={className}>{String(record[field] ?? id)}</span>;
}

DataTableCellRelationProvider.displayName = "DataTableCellRelationProvider";
DataTableCellRelation.displayName = "DataTableCellRelation";
