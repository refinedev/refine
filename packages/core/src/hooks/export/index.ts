import { useState } from "react";
import { useResource, useDataProvider } from "@hooks";
import {
    BaseRecord,
    MapDataFn,
    CrudSorting,
    CrudFilters,
    MetaQuery,
} from "../../interfaces";
import {
    userFriendlyResourceName,
    pickDataProvider,
    pickNotDeprecated,
} from "@definitions";
import { ExportToCsv, Options } from "export-to-csv-fix-source-map";

type UseExportOptionsType<
    TData extends BaseRecord = BaseRecord,
    TVariables = any,
> = {
    /**
     * Resource name for API data interactions
     * @default Resource name that it reads from route
     * @deprecated `resourceName` is deprecated. Use `resource` instead.
     */
    resourceName?: string;
    /**
     * Resource name for API data interactions
     * @default Resource name that it reads from route
     */
    resource?: string;
    /**
     * A mapping function that runs for every record. Mapped data will be included in the file contents
     */
    mapData?: MapDataFn<TData, TVariables>;
    /**
     *  Sorts records
     *  @deprecated `sorter` is deprecated. Use `sorters` instead.
     */
    sorter?: CrudSorting;
    /**
     *  Sorts records
     */
    sorters?: CrudSorting;
    /**
     *  Filters records
     */
    filters?: CrudFilters;
    maxItemCount?: number;
    /**
     *  Requests to fetch data are made as batches by page size. By default, it is 20. Used for `getList` method of `DataProvider`
     */
    pageSize?: number;
    /**
     *  Used for exporting options
     *  @type [Options](https://github.com/alexcaza/export-to-csv)
     */
    exportOptions?: Options;
    /**
     *  Metadata query for `dataProvider`
     */
    meta?: MetaQuery;
    /**
     *  Metadata query for `dataProvider`
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
    /**
     *  Callback to handle error events of this hook
     */
    onError?: (error: any) => void;
};

type UseExportReturnType = {
    isLoading: boolean;
    triggerExport: () => Promise<void>;
};

/**
 * `useExport` hook allows you to make your resources exportable.
 *
 * @see {@link https://refine.dev/docs/core/hooks/import-export/useExport} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TVariables - Values for params.
 *
 */
export const useExport = <
    TData extends BaseRecord = BaseRecord,
    TVariables = any,
>({
    resourceName,
    resource: resourceFromProps,
    sorter,
    sorters,
    filters,
    maxItemCount,
    pageSize = 20,
    mapData = (item) => item as any,
    exportOptions,
    meta,
    metaData,
    dataProviderName,
    onError,
}: UseExportOptionsType<TData, TVariables> = {}): UseExportReturnType => {
    const [isLoading, setIsLoading] = useState(false);

    const dataProvider = useDataProvider();

    const { resource, resources } = useResource();

    const filename = `${userFriendlyResourceName(
        resource?.name,
        "plural",
    )}-${new Date().toLocaleString()}`;

    const { getList } = dataProvider(
        pickDataProvider(
            resource?.identifier ?? resource?.name,
            dataProviderName,
            resources,
        ),
    );

    const triggerExport = async () => {
        setIsLoading(true);

        let rawData: BaseRecord[] = [];

        let current = 1;
        let preparingData = true;
        while (preparingData) {
            try {
                const { data, total } = await getList<TData>({
                    resource: resource?.name ?? "",
                    filters,
                    sort: pickNotDeprecated(sorters, sorter),
                    sorters: pickNotDeprecated(sorters, sorter),
                    pagination: {
                        current,
                        pageSize,
                        mode: "server",
                    },
                    meta: pickNotDeprecated(meta, metaData),
                    metaData: pickNotDeprecated(meta, metaData),
                });

                current++;

                rawData.push(...data);

                if (maxItemCount && rawData.length >= maxItemCount) {
                    rawData = rawData.slice(0, maxItemCount);
                    preparingData = false;
                }

                if (total === rawData.length) {
                    preparingData = false;
                }
            } catch (error) {
                setIsLoading(false);
                preparingData = false;

                onError?.(error);

                return;
            }
        }

        const csvExporter = new ExportToCsv({
            filename,
            useKeysAsHeaders: true,
            ...exportOptions,
        });

        csvExporter.generateCsv(rawData.map(mapData as any));

        setIsLoading(false);
    };

    return {
        isLoading,
        triggerExport,
    };
};
