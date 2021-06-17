import React, { PropsWithChildren, ReactElement } from "react";
import { Button, ButtonProps, Upload } from "antd";
import { useTranslate, useImport } from "@hooks";
import { MapDataFn } from "../../../interfaces";
import { ParseConfig } from "papaparse";

type ImportButtonProps<TItem, TVariables extends TItem = TItem> =
    ButtonProps & {
        resourceName?: string;
        mapData?: MapDataFn<TItem, TVariables>;
        paparseOptions?: ParseConfig;
        batchSize?: number | null;
    };

export const ImportButton = <TItem, TVariables extends TItem = TItem>({
    resourceName,
    mapData,
    batchSize = 1,
    paparseOptions,
    ...rest
}: PropsWithChildren<ImportButtonProps<TItem, TVariables>>): ReactElement<
    any,
    any
> => {
    const translate = useTranslate();
    const { uploadProps, buttonProps } = useImport({
        resourceName,
        mapData,
        batchSize,
        paparseOptions,
    });

    return (
        <Upload {...uploadProps}>
            <Button {...buttonProps} {...rest}>
                {translate("buttons.import", "Import")}
            </Button>
        </Upload>
    );
};
