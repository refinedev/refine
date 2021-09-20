import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useResourceWithRoute } from "@hooks";
import {
    ResourceRouterParams,
    IDataContext,
    BaseRecord,
    MapDataFn,
    CrudSorting,
    CrudFilters,
    MetaDataQuery,
} from "../../interfaces";
import { DataContext } from "@contexts/data";
import { userFriendlyResourceName } from "@definitions";
import { ExportToCsv, Options } from "export-to-csv";
import dayjs from "dayjs";

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
};

type UseExportReturnType = {
    isLoading: boolean;
    triggerExport: () => Promise<void>;
};

/**
 * `useExport` hook allows you to make your resources exportable.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/import-export/useExport} for more details.
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
}: UseExportOptionsType<TData, TVariables> = {}): UseExportReturnType => {
    const [isLoading, setIsLoading] = useState(false);

    const resourceWithRoute = useResourceWithRoute();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);

    if (resourceName) {
        resource = resourceName;
    }

    const filename = `${userFriendlyResourceName(
        resource,
        "plural",
    )}-${dayjs().format("YYYY-MM-DD-HH-mm-ss")}`;

    const { getList } = useContext<IDataContext>(DataContext);

    const triggerExport = async () => {
        setIsLoading(true);

        let rawData: BaseRecord[] = [];

        let current = 1;
        let preparingData = true;
        while (preparingData) {
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
