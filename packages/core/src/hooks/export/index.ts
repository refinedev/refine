import { useState } from "react";
import {
    useResourceWithRoute,
    useRouterContext,
    useDataProvider,
} from "@hooks";
import {
    ResourceRouterParams,
    BaseRecord,
    MapDataFn,
    CrudSorting,
    CrudFilters,
    MetaDataQuery,
} from "../../interfaces";
import { userFriendlyResourceName } from "@definitions";
import { ExportToCsv, Options } from "export-to-csv-fix-source-map";

type UseExportOptionsType<
    TData extends BaseRecord = BaseRecord,
    TVariables = any,
> = {
    resourceName?: string;
    mapData?: MapDataFn<TData, TVariables>;
    sorter?: CrudSorting;
    filters?: CrudFilters;
    maxItemCount?: number;
    pageSize?: number;
    exportOptions?: Options;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
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
    sorter,
    filters,
    maxItemCount,
    pageSize = 20,
    mapData = (item) => item as any,
    exportOptions,
    metaData,
    dataProviderName,
    onError,
}: UseExportOptionsType<TData, TVariables> = {}): UseExportReturnType => {
    const [isLoading, setIsLoading] = useState(false);

    const resourceWithRoute = useResourceWithRoute();
    const dataProvider = useDataProvider();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);

    if (resourceName) {
        resource = resourceName;
    }

    const filename = `${userFriendlyResourceName(
        resource,
        "plural",
    )}-${new Date().toLocaleString()}`;

    const { getList } = dataProvider(dataProviderName);

    const triggerExport = async () => {
        setIsLoading(true);

        let rawData: BaseRecord[] = [];

        let current = 1;
        let preparingData = true;
        while (preparingData) {
            try {
                const { data, total } = await getList<TData>({
                    resource,
                    filters,
                    sort: sorter,
                    pagination: {
                        current,
                        pageSize,
                    },
                    metaData,
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
