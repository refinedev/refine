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
    mapData = (item) => item as any,
    exportOptions,
}: UseExportOptionsType<TData, TVariables>): UseExportReturnType => {
    const [isLoading, setIsLoading] = useState(false);

    const resourceWithRoute = useResourceWithRoute();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);

    if (resourceName) {
        resource = resourceName;
    }

    console.log(
        `${userFriendlyResourceName(resource, "plural")}-${dayjs().format(
            "YYYY-MM-DD-HH:mm:ss",
        )}`,
    );

    const { getList } = useContext<IDataContext>(DataContext);

    const fetchData = async () => {
        setIsLoading(true);

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

        const csvExporter = new ExportToCsv({
            title: `${userFriendlyResourceName(
                resource,
                "plural",
            )}-${dayjs().format("YYYY-MM-DD-HH:mm:ss")}`,
            useKeysAsHeaders: true,
            ...exportOptions,
        });
        csvExporter.generateCsv(rawData.map(mapData as any));

        setIsLoading(false);
    };

    return {
        loading: isLoading,
        onClick: fetchData,
    };
};
