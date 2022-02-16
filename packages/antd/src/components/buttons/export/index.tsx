import React from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useTranslate } from "@pankod/refine-core";

export type ExportButtonProps = ButtonProps & {
    hideText?: boolean;
};

/**
 * `<ExportButton>` is an Ant Design {@link https://ant.design/components/button/ `<Button>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
    hideText = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <>
            <Button type="default" icon={<ExportOutlined />} {...rest}>
                {!hideText &&
                    (children ?? translate("buttons.export", "Export"))}
            </Button>
        </>
    );
};
