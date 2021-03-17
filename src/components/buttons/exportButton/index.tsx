import React, { FC, useContext, useState } from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { CSVDownload } from "react-csv";
import dayjs from "dayjs";

import { useTranslate } from "@hooks";
import {
    ResourceRouterParams,
    Sort,
    Filters,
    IDataContext,
    BaseRecord,
} from "@interfaces";
import { DataContext } from "@contexts/data";

type ExportButtonProps = ButtonProps & {
    resourceName?: string;
    sorter?: Sort;
    filters?: Filters;
    maxItemCount?: number;
    pageSize?: number;
    callbackfn?(
        value: BaseRecord,
        index: number,
        array: BaseRecord[],
    ): BaseRecord;
};

export const ExportButton: FC<ExportButtonProps> = ({
    resourceName,
    sorter,
    filters,
    maxItemCount,
    pageSize = 20,
    callbackfn,
    ...rest
}) => {
    const translate = useTranslate();

    const [loading, setLoading] = useState(false);
    const [fileReady, setFileReady] = useState(false);
    const [exportData, setExportData] = useState<BaseRecord[]>([]);

    let { resource } = useParams<ResourceRouterParams>();

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
        while (true) {
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
                    break;
                }

                continue;
            }

            break;
        }

        setExportData(callbackfn ? rawData.map(callbackfn) : rawData);
        setFileReady(true);
        setLoading(false);
    };

    const downloadFile = () => {
        if (fileReady) {
            return (
                <CSVDownload
                    data={exportData}
                    filename={`${resource}-${dayjs().format()}.csv`}
                    target="_blank"
                />
            );
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
