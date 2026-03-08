// @ts-nocheck — React 19 / @refinedev/core v5 type compatibility
import {
  useUpdate,
  type BaseKey,
  type BaseRecord,
  type HttpError,
  type MutationMode,
} from "@refinedev/core";
import {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

// ─── Return type ─────────────────────────────────────────────────────────────

export type UseEditableTableReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
> = {
  /** Id of the row currently being edited, or `undefined` when none. */
  editingId: BaseKey | undefined;
  /** Current draft values while a row is open for editing. */
  editValues: TVariables;
  /** Update draft values (e.g. from an input `onChange` handler). */
  setEditValues: Dispatch<SetStateAction<TVariables>>;
  /** Returns `true` when the given row id is the one being edited. */
  isEditing: (id: BaseKey) => boolean;
  /**
   * Spread onto the edit / pencil button for a given row.
   * Pass the row record as the second argument to pre-populate `editValues`.
   *
   * @example
   * ```tsx
   * <Button {...editButtonProps(row.original.id, row.original)}>
   *   <PencilIcon />
   * </Button>
   * ```
   */
  editButtonProps: (id: BaseKey, row?: TData) => { onClick: () => void };
  /** Spread onto the cancel button to discard unsaved changes. */
  cancelButtonProps: { onClick: () => void };
  /**
   * Spread onto the save / confirm button to persist changes via `useUpdate`.
   *
   * @example
   * ```tsx
   * <Button {...saveButtonProps}><CheckIcon /></Button>
   * ```
   */
  saveButtonProps: { onClick: () => void; disabled: boolean };
};

// ─── Props type ───────────────────────────────────────────────────────────────

export type UseEditableTableProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
> = {
  /** The refine resource name (e.g. `"posts"`). */
  resource: string;
  /**
   * Close the editing row automatically after a successful save.
   * @default true
   */
  autoSaveClose?: boolean;
  /**
   * Mutation mode forwarded to `useUpdate`.
   * @default "pessimistic"
   */
  mutationMode?: MutationMode;
};

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * `useEditableTable` is a companion hook for `useTable` that adds inline
 * row-editing to shadcn/ui tables. It owns the editing state and wires up
 * `useUpdate` from `@refinedev/core`, mirroring the spirit of
 * `@refinedev/antd`'s `useEditableTable` for headless / shadcn setups.
 *
 * ### Usage
 * ```tsx
 * // 1. Obtain editing helpers.
 * const {
 *   editingId, editValues, setEditValues,
 *   isEditing, editButtonProps, cancelButtonProps, saveButtonProps,
 * } = useEditableTable<IPost, HttpError, Partial<IPost>>({ resource: "posts" });
 *
 * // 2. Define columns that close over the helpers.
 * const columns = useMemo<ColumnDef<IPost>[]>(() => [
 *   {
 *     accessorKey: "title",
 *     cell: ({ getValue, row }) =>
 *       isEditing(row.original.id) ? (
 *         <Input
 *           value={editValues.title ?? ""}
 *           onChange={(e) =>
 *             setEditValues((p) => ({ ...p, title: e.target.value }))
 *           }
 *         />
 *       ) : (
 *         <span>{getValue() as string}</span>
 *       ),
 *   },
 *   {
 *     id: "actions",
 *     cell: ({ row }) => {
 *       const id = row.original.id;
 *       return isEditing(id) ? (
 *         <>
 *           <Button {...saveButtonProps}><CheckIcon /></Button>
 *           <Button {...cancelButtonProps}><XIcon /></Button>
 *         </>
 *       ) : (
 *         <Button {...editButtonProps(id, row.original)}><PencilIcon /></Button>
 *       );
 *     },
 *   },
 * ], [editingId, editValues, saveButtonProps]);
 *
 * // 3. Pass columns to useTable as normal.
 * const { reactTable } = useTable<IPost>({
 *   columns,
 *   refineCoreProps: { resource: "posts" },
 * });
 * ```
 *
 * > **Design note:** This hook does **not** wrap `useTable` — that would create
 * > a circular dependency because TanStack Table columns reference the hook's
 * > own return values. Keeping them separate is more composable and mirrors how
 * > `@refinedev/antd`'s `useEditableTable` works (antd receives columns
 * > independently of the hook).
 */
export const useEditableTable = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>({
  resource,
  autoSaveClose = true,
  mutationMode = "pessimistic",
}: UseEditableTableProps<TData, TError, TVariables>): UseEditableTableReturnType<
  TData,
  TError,
  TVariables
> => {
  const [editingId, setEditingId] = useState<BaseKey | undefined>(undefined);
  const [editValues, setEditValues] = useState<TVariables>({} as TVariables);

  const { mutate, isLoading: isPending } = useUpdate<TData, TError, TVariables>();

  const isEditing = useCallback(
    (id: BaseKey) => id === editingId,
    [editingId],
  );

  // Stable reference — useState setters are guaranteed stable by React
  const editButtonProps = useCallback(
    (id: BaseKey, row?: TData) => ({
      onClick: () => {
        setEditValues((row ?? {}) as TVariables);
        setEditingId(id);
      },
    }),
    [],
  );

  const cancelButtonProps = useMemo(
    () => ({
      onClick: () => {
        setEditingId(undefined);
        setEditValues({} as TVariables);
      },
    }),
    [],
  );

  const saveButtonProps = useMemo(
    () => ({
      disabled: isPending,
      onClick: () => {
        if (editingId === undefined) return;
        mutate(
          { resource, id: editingId, values: editValues, mutationMode },
          {
            onSuccess: () => {
              if (autoSaveClose) {
                setEditingId(undefined);
                setEditValues({} as TVariables);
              }
            },
          },
        );
      },
    }),
    // editValues + editingId ensure onClick always captures the latest draft
    [isPending, editingId, editValues, resource, mutationMode, autoSaveClose, mutate],
  );

  return {
    editingId,
    editValues,
    setEditValues,
    isEditing,
    editButtonProps,
    cancelButtonProps,
    saveButtonProps,
  };
};
