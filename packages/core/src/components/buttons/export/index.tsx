import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";

import { useTranslate } from "@hooks";

// type ExportButtonProps = ButtonProps & {
//     resourceName?: string;
//     sorter?: CrudSorting;
//     filters?: CrudFilters;
//     maxItemCount?: number;
//     pageSize?: number;
//     mapData?(value: BaseRecord, index: number, array: BaseRecord[]): BaseRecord;
//     csvProps?: CSVDownloadProps;
// };

export const ExportButton: FC<ButtonProps> = ({ children, ...rest }) => {
    const translate = useTranslate();

    return (
        <>
            <Button type="default" icon={<ExportOutlined />} {...rest}>
                {children ?? translate("buttons.export", "Export")}
            </Button>
        </>
    );
};
