import React, { FC } from "react";
import { Button, ButtonProps, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { ImportOutlined } from "@ant-design/icons";
import { useCreate, useResourceWithRoute, useTranslate } from "@hooks";
import { useParams } from "react-router-dom";
import { ResourceRouterParams } from "../../../interfaces";
import { parse, ParseConfig } from "papaparse";
import { MapDataFn } from "./csvImport.interface";
import { importCSVMapper } from "@definitions";

type ImportButtonProps = ButtonProps & {
    resourceName?: string;
    mapData?: MapDataFn;
    paparseOptions?: ParseConfig;
};

export const ImportButton: FC<ImportButtonProps> = ({
    resourceName,
    mapData = (data) => data,
    paparseOptions,
    ...rest
}) => {
    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);
    const { mutate, isLoading } = useCreate();

    if (resourceName) {
        resource = resourceName;
    }

    const handleChange = ({ file }: UploadChangeParam) => {
        parse((file as unknown) as File, {
            complete: ({ data }: { data: unknown[][] }) => {
                importCSVMapper(data, mapData).map((value) => {
                    mutate({
                        resource,
                        values: value,
                    });
                });
            },
            ...paparseOptions,
        });
    };

    return (
        <Upload
            onChange={handleChange}
            showUploadList={false}
            beforeUpload={() => false}
            accept=".csv"
            data-testid="import-button-wrapper"
        >
            <Button
                type="default"
                icon={<ImportOutlined />}
                loading={isLoading}
                {...rest}
                data-testid="import-button"
            >
                {translate("common:buttons.export", "Import")}
            </Button>
        </Upload>
    );
};
