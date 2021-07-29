import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";

import { useTranslate } from "@hooks";

/**
 * `<ExportButton>` is an Ant Design {@link https://ant.design/components/button/ `<Button>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/export-button} for more details.
 */
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
