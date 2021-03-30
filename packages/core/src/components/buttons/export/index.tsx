import React, { FC, useContext, useState } from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { CSVDownload } from "react-csv";

import { useResourceWithRoute, useTranslate } from "@hooks";
import {
    ResourceRouterParams,
    Sort,
    Filters,
    IDataContext,
    BaseRecord,
} from "../../../interfaces";
import { DataContext } from "@contexts/data";
import { CSVDownloadProps } from "./csvDownload.interface";

type ExportButtonProps = ButtonProps & {
    resourceName?: string;
    sorter?: Sort;
    filters?: Filters;
    maxItemCount?: number;
    pageSize?: number;
    mapData?(value: BaseRecord, index: number, array: BaseRecord[]): BaseRecord;
    csvProps?: CSVDownloadProps;
};

export const ExportButton: FC<ExportButtonProps> = ({
    resourceName,
    sorter,
    filters,
    maxItemCount,
    pageSize = 20,
    mapData,
    csvProps,
    ...rest
}) => {
    const translate = useTranslate();

    const [loading, setLoading] = useState(false);
    const [fileReady, setFileReady] = useState(false);
    const [exportData, setExportData] = useState<BaseRecord[]>([]);

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = useResourceWithRoute(routeResourceName);

    if (resourceName) {
        resource = resourceName;
    }

    const { getList } = useContext<IDataContext>(DataContext);

    const fetchData = async () => {
        setLoading(true);
        setFileReady(false);
        setExportData([]);

        const rawData: BaseRecord[] = [];

        let current = 1;
        let preparingData = true;
        while (preparingData) {
            const { data } = await getList(resource, {
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

        setExportData(mapData ? rawData.map(mapData) : rawData);
        setFileReady(true);
        setLoading(false);
    };

    const downloadFile = () => {
        if (fileReady) {
            return <CSVDownload {...csvProps} data={exportData} />;
        }

        return;
    };

    return (
        <>
            {downloadFile()}
            <Button
                onClick={fetchData}
                type="default"
                icon={<ExportOutlined />}
                loading={loading}
                {...rest}
            >
                {translate("common:buttons.export", "Export")}
            </Button>
        </>
    );
};
