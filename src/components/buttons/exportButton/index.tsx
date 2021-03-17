import React, { FC, useContext, useState } from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { CSVDownload } from "react-csv";

import { useTranslate } from "@hooks";
import {
    ResourceRouterParams,
    Sort,
    Filters,
    IDataContext,
    BaseRecord,
} from "@interfaces";
import { DataContext } from "@contexts/data";
import dayjs from "dayjs";

type ExportButtonProps = ButtonProps & {
    resourceName?: string;
    sorter?: Sort;
    filters?: Filters;
    maxItemCount?: number;
    pageSize?: number;
};

export const ExportButton: FC<ExportButtonProps> = ({
    resourceName,
    sorter,
    filters,
    maxItemCount,
    pageSize = 20,
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

        const allData: BaseRecord[] = [];

        for (let index = 1; index < 9999; index++) {
            const { data } = await getList(resource, {
                filters,
                sort: sorter,
                pagination: {
                    current: index,
                    pageSize,
                },
            });

            if (data.length > 0) {
                allData.push(...data);

                if (maxItemCount && allData.length >= maxItemCount) {
                    allData.slice(0, maxItemCount);
                    break;
                }

                continue;
            }

            break;
        }

        setExportData(allData);
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
