export type FormWithSyncWithLocationParams = {
    /**
     * If true, the form will be synced with the location.
     * If an object is passed, the key property will be used as the key for the query params.
     * By default, query params are placed under the key, `${resource.name}-${action}`.
     */
    syncWithLocation?: boolean | { key?: string; syncId?: boolean };
};
