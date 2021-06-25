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
} from "../../interfaces";
import { DataContext } from "@contexts/data";

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
};

type UseExportReturnType = {};

export const useExport = <
    TData extends BaseRecord = BaseRecord,
    TVariables = any,
>({
    resourceName,
    sorter,
    filters,
    maxItemCount,
    pageSize = 20,
    mapData,
}: UseExportOptionsType<TData, TVariables>): UseExportReturnType => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFileReady, setIsFileReady] = useState(false);
    const [exportData, setExportData] = useState<BaseRecord[]>([]);

    const resourceWithRoute = useResourceWithRoute();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);

    if (resourceName) {
        resource = resourceName;
    }

    const { getList } = useContext<IDataContext>(DataContext);

    const fetchData = async () => {
        setIsLoading(true);
        setIsFileReady(false);
        setExportData([]);

        const rawData: BaseRecord[] = [];

        let current = 1;
        let preparingData = true;
        while (preparingData) {
            const { data } = await getList<TData>(resource, {
                filters,
                sort: sorter,
                pagination: {
                    current,
                    pageSize,
                },
            });

            current++;

            if (data.length > 0) {
                rawData.push(...data);

                if (maxItemCount && rawData.length >= maxItemCount) {
                    rawData.slice(0, maxItemCount);
                    preparingData = false;
                }

                continue;
            }

            preparingData = false;
        }

        setExportData(mapData ? rawData.map(mapData as any) : rawData);
        setIsFileReady(true);
        setIsLoading(false);
    };

    return {
        loading: isLoading,
        onClick: fetchData,
    };
};
