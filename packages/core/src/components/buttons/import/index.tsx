import React, { FC } from "react";
import { Button, ButtonProps, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { ImportOutlined } from "@ant-design/icons";
import {
    useCreate,
    useCreateMany,
    useResourceWithRoute,
    useTranslate,
} from "@hooks";
import { useParams } from "react-router-dom";
import { ResourceRouterParams } from "../../../interfaces";
import { parse, ParseConfig } from "papaparse";
import { MapDataFn } from "./csvImport.interface";
import { importCSVMapper } from "@definitions";
import chunk from "lodash/chunk";

type ImportButtonProps = ButtonProps & {
    resourceName?: string;
    mapData?: MapDataFn;
    paparseOptions?: ParseConfig;
    batchSize?: number | null;
};

export const ImportButton: FC<ImportButtonProps> = ({
    resourceName,
    mapData = (data) => data,
    batchSize = 1,
    paparseOptions,
    ...rest
}) => {
    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    let { name: resource } = resourceWithRoute(routeResourceName);
    const {
        mutate: mutateCreateMany,
        isLoading: createManyIsLoading,
    } = useCreateMany();
    const { mutate: mutateCreate, isLoading: createIsLoading } = useCreate();

    if (resourceName) {
        resource = resourceName;
    }

    const handleChange = ({ file }: UploadChangeParam) => {
        parse((file as unknown) as File, {
            complete: ({ data }: { data: unknown[][] }) => {
                const values = importCSVMapper(data, mapData);

                if (batchSize === null) {
                    mutateCreateMany({
                        resource,
                        values,
                    });
                } else if (batchSize === 1) {
                    values.forEach((value) => {
                        mutateCreate({
                            resource,
                            values: value,
                        });
                    });
                } else {
                    chunk(values, batchSize).forEach((batch) => {
                        mutateCreateMany({
                            resource,
                            values: batch,
                        });
                    });
                }
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
        >
            <Button
                type="default"
                icon={<ImportOutlined />}
                loading={createIsLoading || createManyIsLoading}
                {...rest}
            >
                {translate("buttons.import", "Import")}
            </Button>
        </Upload>
    );
};
