import React, { FC, useContext, useEffect, useState } from "react";
import { Button, ButtonProps, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { ImportOutlined } from "@ant-design/icons";
import { useCreate, useResourceWithRoute, useTranslate } from "@hooks";
import { useParams } from "react-router-dom";
import { BaseRecord, ResourceRouterParams } from "../../../interfaces";
import zip from "lodash/zip";
import { parse, ParseConfig } from "papaparse";
import { useQueryClient } from "react-query";

type ImportButtonProps = ButtonProps & {
    resourceName?: string;
    mapData?(
        value: BaseRecord,
        index?: number,
        array?: BaseRecord[],
        data?: unknown[][],
    ): BaseRecord;
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
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useCreate();

    if (resourceName) {
        resource = resourceName;
    }

    useEffect(() => {
        // TODO: invalidate query farklı şekilde halledilmeli
        if (!isLoading) {
            queryClient.invalidateQueries(`resource/list/${resource}`);
        }
    }, [isLoading]);

    const onChange = ({ file }: UploadChangeParam) => {
        parse((file as unknown) as File, {
            complete: ({ data }: { data: unknown[][] }) => {
                const [headers, ...body] = data;

                body.map((entry) => Object.fromEntries(zip(headers, entry)))
                    .map((item, index, array) =>
                        mapData.call(undefined, item, index, array, data),
                    )
                    .forEach((value) => {
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
