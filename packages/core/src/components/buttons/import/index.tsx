import React, { FC, useContext, useState } from "react";
import { Button, ButtonProps, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { ImportOutlined } from "@ant-design/icons";
import { useCreate, useResourceWithRoute, useTranslate } from "@hooks";
import { useParams } from "react-router-dom";
import { BaseRecord, ResourceRouterParams } from "../../../interfaces";
import zip from "lodash/zip";
import { parse } from "papaparse";

type ImportButtonProps = ButtonProps & {
    resourceName?: string;
    mapData?(value: BaseRecord, index: number, array: BaseRecord[]): BaseRecord;
    transform?<T>(data: T[]): T[];
};

export const ImportButton: FC<ImportButtonProps> = ({
    resourceName,
    transform = (data) => data,
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

    const onChange = ({ file }: UploadChangeParam) => {
        parse((file as unknown) as File, {
            complete: ({ data }: { data: unknown[][] }) => {
                const [headers, ...body] = data;

                const values = transform(
                    body.map((item) => Object.fromEntries(zip(headers, item))),
                );

                values.forEach(() => {
                    mutate({
                        resource,
                        values,
                    });
                });
            },
        });
    };

    return (
        <Upload
            onChange={onChange}
            showUploadList={false}
            beforeUpload={() => false}
            accept=".csv"
        >
            <Button
                type="default"
                icon={<ImportOutlined />}
                loading={isLoading}
                {...rest}
            >
                {translate("common:buttons.export", "Import")}
            </Button>
        </Upload>
    );
};
